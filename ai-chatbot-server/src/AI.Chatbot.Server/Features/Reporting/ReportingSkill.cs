using System.ComponentModel;
using Microsoft.SemanticKernel;

namespace AI.Chatbot.Server.Features.Reporting
{
    public class ReportingSkill
    {
        [KernelFunction, Description("Gets data for a report. 'reportName' is the page name. 'queryType' can be 'top', 'max', or 'min'. 'parametersJson' is for filters. 'language' is the language code (e.g., 'en', 'vi') for the response.")]
        public string GetReportData(
            [Description("The name of the report to generate")] string reportName,
            [Description("The type of query, e.g., 'top', 'max', 'min'")] string queryType,
            [Description("The number of records to return")] int count,
            [Description("JSON string for filtering parameters")] string parametersJson,
            [Description("The language for the response")] string language)
        {
            // Placeholder for demonstration
            var tableData = new
            {
                type = "table",
                content = new
                {
                    headers = new[] { "Product", "Sales" },
                    rows = new[]
                    {
                        new[] { "Laptop", "1500" },
                        new[] { "Mouse", "250" }
                    }
                }
            };

            // In a real implementation, you would query a database
            // and then use an LLM to summarize or format the data in the requested language.

            // For now, we'll just serialize the placeholder data
            return System.Text.Json.JsonSerializer.Serialize(tableData);
        }
    }
}