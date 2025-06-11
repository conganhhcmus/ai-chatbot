using Microsoft.AspNetCore.Mvc;
using ClosedXML.Excel;
using System.IO;
using System.Data;
using System;

namespace AI.Chatbot.Server.Features.Reporting
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExportController : ControllerBase
    {
        [HttpGet("excel")]
        public IActionResult ExportToExcel(string reportName, string parametersJson)
        {
            // In a real application, you would use these parameters
            // to fetch data from a database or another service.
            // For this example, we'll generate some dummy data.

            var dataTable = new DataTable("ChatReport");
            dataTable.Columns.Add("SessionId", typeof(string));
            dataTable.Columns.Add("UserMessage", typeof(string));
            dataTable.Columns.Add("BotResponse", typeof(string));
            dataTable.Columns.Add("Timestamp", typeof(DateTime));

            dataTable.Rows.Add(Guid.NewGuid().ToString(), "Hello", "Hi there!", DateTime.UtcNow.AddMinutes(-5));
            dataTable.Rows.Add(Guid.NewGuid().ToString(), "How are you?", "I am a bot, I am well!", DateTime.UtcNow.AddMinutes(-2));

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add(dataTable, reportName);
                worksheet.Columns().AdjustToContents();

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    var fileName = $"{reportName}_{DateTime.UtcNow:yyyyMMdd}.xlsx";
                    return File(content, contentType, fileName);
                }
            }
        }
    }
} 