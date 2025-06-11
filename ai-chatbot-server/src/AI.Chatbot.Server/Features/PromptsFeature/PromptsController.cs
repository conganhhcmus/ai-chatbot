using AI.Chatbot.Server.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace AI.Chatbot.Server.Features.PromptsFeature
{
    [ApiController]
    [Route("api/admin/prompts")]
    [Authorize(Policy = "Admin")]
    public class PromptsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PromptsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetPrompts()
        {
            var prompts = await _context.Prompts.ToListAsync();
            return Ok(prompts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPrompt(int id)
        {
            var prompt = await _context.Prompts.FindAsync(id);
            if (prompt == null)
            {
                return NotFound();
            }
            return Ok(prompt);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePrompt([FromBody] Prompt prompt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            prompt.CreatedAt = System.DateTime.UtcNow;
            prompt.UpdatedAt = System.DateTime.UtcNow;

            _context.Prompts.Add(prompt);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPrompt), new { id = prompt.Id }, prompt);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePrompt(int id, [FromBody] Prompt prompt)
        {
            if (id != prompt.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            prompt.UpdatedAt = System.DateTime.UtcNow;
            _context.Entry(prompt).State = EntityState.Modified;
            _context.Entry(prompt).Property(x => x.CreatedAt).IsModified = false;


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Prompts.Any(e => e.Id == id))
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePrompt(int id)
        {
            var prompt = await _context.Prompts.FindAsync(id);
            if (prompt == null)
            {
                return NotFound();
            }

            _context.Prompts.Remove(prompt);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}