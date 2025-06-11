using AI.Chatbot.Server.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Memory;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using Microsoft.SemanticKernel.Connectors.Qdrant;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.SemanticKernel.Text;
using System.Linq;
using Microsoft.Extensions.Logging;

namespace AI.Chatbot.Server.Features.AdminFeature
{
    [ApiController]
    [Route("api/admin")]
    [Authorize(Policy = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly Kernel _kernel;
        private readonly ISemanticTextMemory _memory;
        private readonly ILogger<AdminController> _logger;
        private const string KnowledgeCollectionName = "knowledge";

        public AdminController(AppDbContext context, Kernel kernel, ISemanticTextMemory memory, ILogger<AdminController> logger)
        {
            _context = context;
            _kernel = kernel;
            _memory = memory;
            _logger = logger;
        }

        [HttpGet("health")]
        public IActionResult HealthCheck()
        {
            _logger.LogInformation("Admin health check endpoint was called.");
            return Ok("Admin endpoint is healthy.");
        }

        [HttpGet("knowledge")]
        public async Task<IActionResult> GetKnowledgeDocuments()
        {
            _logger.LogInformation("Getting all knowledge documents.");
            var documents = await _context.KnowledgeDocuments.ToListAsync();
            return Ok(documents);
        }

        [HttpPost("knowledge")]
        public async Task<IActionResult> UploadKnowledgeDocument(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                _logger.LogWarning("UploadKnowledgeDocument called with no file.");
                return BadRequest("No file uploaded.");
            }
            _logger.LogInformation("Uploading knowledge document: {FileName}", file.FileName);

            try
            {
                var content = new StringBuilder();
                using (var reader = new StreamReader(file.OpenReadStream()))
                {
                    while (reader.Peek() >= 0)
                        content.AppendLine(await reader.ReadLineAsync());
                }

                var document = new KnowledgeDocument
                {
                    FileName = file.FileName,
                    Content = content.ToString(),
                    UploadedAt = System.DateTime.UtcNow
                };
                _context.KnowledgeDocuments.Add(document);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Saved document {FileName} to database with ID {DocumentId}", document.FileName, document.Id);

                var lines = TextChunker.SplitPlainTextLines(document.Content, 40);
                var paragraphs = TextChunker.SplitPlainTextParagraphs(lines, 120, 30);

                _logger.LogInformation("Generating and saving {ParagraphCount} chunks for document {DocumentId}", paragraphs.Count, document.Id);
                for (int i = 0; i < paragraphs.Count; i++)
                {
                    await _memory.SaveInformationAsync(KnowledgeCollectionName, paragraphs[i], $"doc:{document.Id}:chunk:{i}");
                }
                _logger.LogInformation("Successfully saved all chunks for document {DocumentId}", document.Id);


                return CreatedAtAction(nameof(GetKnowledgeDocuments), new { id = document.Id }, document);
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "An error occurred while uploading knowledge document: {FileName}", file.FileName);
                return StatusCode(500, "An internal error occurred.");
            }
        }

        [HttpDelete("knowledge/{id}")]
        public async Task<IActionResult> DeleteKnowledgeDocument(int id)
        {
            _logger.LogInformation("Attempting to delete knowledge document with ID: {DocumentId}", id);
            var document = await _context.KnowledgeDocuments.FindAsync(id);
            if (document == null)
            {
                _logger.LogWarning("DeleteKnowledgeDocument: Document with ID {DocumentId} not found.", id);
                return NotFound();
            }

            try
            {
                // Re-create chunks to delete them from the vector store
                var lines = TextChunker.SplitPlainTextLines(document.Content, 40);
                var paragraphs = TextChunker.SplitPlainTextParagraphs(lines, 120, 30);
                _logger.LogInformation("Deleting {ParagraphCount} chunks for document {DocumentId}", paragraphs.Count, id);

                for (int i = 0; i < paragraphs.Count; i++)
                {
                    // This can fail if the memory record does not exist, but we can ignore it.
                    try
                    {
                        await _memory.RemoveAsync(KnowledgeCollectionName, $"doc:{document.Id}:chunk:{i}");
                    }
                    catch (System.Exception ex)
                    {
                        _logger.LogWarning(ex, "Failed to delete chunk {ChunkIndex} for document {DocumentId}. It might have been already deleted.", i, id);
                    }
                }

                _context.KnowledgeDocuments.Remove(document);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Successfully deleted document with ID: {DocumentId}", id);

                return NoContent();
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting knowledge document with ID: {DocumentId}", id);
                return StatusCode(500, "An internal error occurred.");
            }
        }

        [HttpPut("knowledge/{id}")]
        public async Task<IActionResult> UpdateKnowledgeDocument(int id, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                _logger.LogWarning("UpdateKnowledgeDocument called with no file for document ID {DocumentId}.", id);
                return BadRequest("No file uploaded.");
            }

            _logger.LogInformation("Attempting to update knowledge document with ID: {DocumentId} with file {FileName}", id, file.FileName);
            var document = await _context.KnowledgeDocuments.FindAsync(id);
            if (document == null)
            {
                _logger.LogWarning("UpdateKnowledgeDocument: Document with ID {DocumentId} not found.", id);
                return NotFound();
            }

            try
            {
                // First, delete old chunks from vector store
                var oldLines = TextChunker.SplitPlainTextLines(document.Content, 40);
                var oldParagraphs = TextChunker.SplitPlainTextParagraphs(oldLines, 120, 30);
                _logger.LogInformation("Deleting {ParagraphCount} old chunks for document {DocumentId}", oldParagraphs.Count, id);
                for (int i = 0; i < oldParagraphs.Count; i++)
                {
                    try
                    {
                        await _memory.RemoveAsync(KnowledgeCollectionName, $"doc:{document.Id}:chunk:{i}");
                    }
                    catch (System.Exception ex)
                    {
                        _logger.LogWarning(ex, "Failed to delete old chunk {ChunkIndex} for document {DocumentId} during update.", i, id);
                    }
                }

                // Now, update the document and add new chunks
                var content = new StringBuilder();
                using (var reader = new StreamReader(file.OpenReadStream()))
                {
                    while (reader.Peek() >= 0)
                        content.AppendLine(await reader.ReadLineAsync());
                }

                document.FileName = file.FileName;
                document.Content = content.ToString();
                document.UploadedAt = System.DateTime.UtcNow;

                _context.KnowledgeDocuments.Update(document);

                var newLines = TextChunker.SplitPlainTextLines(document.Content, 40);
                var newParagraphs = TextChunker.SplitPlainTextParagraphs(newLines, 120, 30);

                _logger.LogInformation("Generating and saving {ParagraphCount} new chunks for updated document {DocumentId}", newParagraphs.Count, id);
                for (int i = 0; i < newParagraphs.Count; i++)
                {
                    await _memory.SaveInformationAsync(KnowledgeCollectionName, newParagraphs[i], $"doc:{document.Id}:chunk:{i}");
                }

                await _context.SaveChangesAsync();
                _logger.LogInformation("Successfully updated document {DocumentId} with file {FileName}", id, file.FileName);

                return Ok(document);
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating document {DocumentId} with file {FileName}", id, file.FileName);
                return StatusCode(500, "An internal error occurred.");
            }
        }

        [HttpGet("chathistory")]
        public async Task<IActionResult> GetChatHistory()
        {
            var history = await _context.ChatMessages
                .OrderBy(m => m.Timestamp)
                .GroupBy(m => m.UserId)
                .Select(g => new
                {
                    UserId = g.Key,
                    Messages = g.ToList()
                })
                .ToListAsync();

            return Ok(history);
        }

        // CRUD for InitialActionButtons

        [HttpGet("initial-actions")]
        public async Task<IActionResult> GetInitialActionButtons()
        {
            var buttons = await _context.InitialActionButtons.ToListAsync();
            return Ok(buttons);
        }

        [HttpGet("initial-actions/{id}")]
        public async Task<IActionResult> GetInitialActionButton(int id)
        {
            var button = await _context.InitialActionButtons.FindAsync(id);
            if (button == null)
            {
                return NotFound();
            }
            return Ok(button);
        }

        [HttpPost("initial-actions")]
        public async Task<IActionResult> CreateInitialActionButton([FromBody] InitialActionButton button)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.InitialActionButtons.Add(button);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetInitialActionButton), new { id = button.Id }, button);
        }

        [HttpPut("initial-actions/{id}")]
        public async Task<IActionResult> UpdateInitialActionButton(int id, [FromBody] InitialActionButton button)
        {
            if (id != button.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(button).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.InitialActionButtons.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("initial-actions/{id}")]
        public async Task<IActionResult> DeleteInitialActionButton(int id)
        {
            var button = await _context.InitialActionButtons.FindAsync(id);
            if (button == null)
            {
                return NotFound();
            }

            _context.InitialActionButtons.Remove(button);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}