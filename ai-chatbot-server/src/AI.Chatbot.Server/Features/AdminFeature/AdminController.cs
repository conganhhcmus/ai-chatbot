using AI.Chatbot.Server.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AI.Chatbot.Server.Features.AdminFeature
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Policy = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("health")]
        public IActionResult HealthCheck()
        {
            return Ok("Admin endpoint is healthy.");
        }

        // Placeholder for knowledge document CRUD
        [HttpGet("knowledge")]
        public IActionResult GetKnowledgeDocuments()
        {
            return Ok("Returning all knowledge documents.");
        }

        // Placeholder for chat history
        [HttpGet("chathistory")]
        public IActionResult GetChatHistory()
        {
            return Ok("Returning chat history.");
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