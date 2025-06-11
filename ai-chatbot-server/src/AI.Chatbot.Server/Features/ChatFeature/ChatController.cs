using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AI.Chatbot.Server.Features.ChatFeature
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        [HttpGet("initial-actions")]
        public ActionResult<IEnumerable<object>> GetInitialActions()
        {
            var actions = new List<object>
            {
                new { label = "What can you do?", payload = "help" },
                new { label = "What is the weather?", payload = "weather" }
            };
            return Ok(actions);
        }
    }
} 