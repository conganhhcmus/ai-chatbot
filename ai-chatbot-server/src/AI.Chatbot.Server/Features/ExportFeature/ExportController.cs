using Microsoft.AspNetCore.Mvc;
using ClosedXML.Excel;
using System.IO;
using System.Threading.Tasks;
using AI.Chatbot.Server.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json;

namespace AI.Chatbot.Server.Features.ExportFeature
{
    public class ExportRequest
    {
        public string ReportName { get; set; }
        public JsonElement Parameters { get; set; }
    }

    [ApiController]
    [Route("api/export")]
    [Authorize(Policy = "Admin")]
    public class ExportController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExportController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("excel")]
        public async Task<IActionResult> ExportToExcel([FromBody] ExportRequest request)
        {
            if (string.IsNullOrEmpty(request.ReportName))
            {
                return BadRequest("ReportName is required.");
            }

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Chat History");

                if (request.ReportName == "ChatHistory")
                {
                    var history = await _context.ChatMessages
                                    .OrderBy(m => m.Timestamp)
                                    .ToListAsync();

                    worksheet.Cell(1, 1).Value = "User ID";
                    worksheet.Cell(1, 2).Value = "Message";
                    worksheet.Cell(1, 3).Value = "Sender";
                    worksheet.Cell(1, 4).Value = "Timestamp";

                    for (int i = 0; i < history.Count; i++)
                    {
                        worksheet.Cell(i + 2, 1).Value = history[i].UserId;
                        worksheet.Cell(i + 2, 2).Value = history[i].Content;
                        worksheet.Cell(i + 2, 3).Value = history[i].Sender;
                        worksheet.Cell(i + 2, 4).Value = history[i].Timestamp;
                    }
                }
                else
                {
                    return BadRequest("Invalid report name.");
                }


                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(
                        content,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        $"{request.ReportName}-{DateTime.UtcNow:yyyyMMddHHmmss}.xlsx"
                    );
                }
            }
        }
    }
} 