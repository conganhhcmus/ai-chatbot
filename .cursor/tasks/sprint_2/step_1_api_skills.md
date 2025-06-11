# Task 2.1: Defining Dynamic Reporting Skills (Backend)

**Goal:** Create a flexible, powerful Semantic Kernel plugin to handle various data reporting queries in multiple languages.

## Checklist

- [x] Following the vertical slice architecture, create a `Reporting` feature module.
- [x] Implement a `ReportingSkill.cs` class within this module.
- [x] Implement a single, generic `GetReportDataAsync` method.
  - [x] The method signature should accept parameters like `string reportName`, `string queryType`, `int count`, `string parametersJson`, and `string language`.
  - [x] Decorate the method with `[KernelFunction]` and a very detailed description.
  - [x] **Example Description:** "Gets data for a report. 'reportName' is the page name. 'queryType' can be 'top', 'max', or 'min'. 'parametersJson' is for filters. 'language' is the language code (e.g., 'en', 'vi') for the response."
- [x] Implement the internal logic of `GetReportDataAsync` to parse parameters and build the query.
- [x] In the final prompt to the LLM for summarizing the data, include an instruction to "Respond in the language: {language}".
- [x] The final output from the function should be a **JSON string** representing a rich message (e.g., a table with headers and data).
- [x] In `Program.cs`, import this skill into the Semantic Kernel instance. (Imported in ChatHub) 