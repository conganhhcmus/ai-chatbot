# Task 2.1: Defining Dynamic Reporting Skills (Backend)

**Goal:** Create a flexible, powerful Semantic Kernel plugin to handle various data reporting queries in multiple languages.

## Checklist

- [ ] Following the vertical slice architecture, create a `Reporting` feature module.
- [ ] Implement a `ReportingSkill.cs` class within this module.
- [ ] Implement a single, generic `GetReportDataAsync` method.
  - [ ] The method signature should accept parameters like `string reportName`, `string queryType`, `int count`, `string parametersJson`, and `string language`.
  - [ ] Decorate the method with `[KernelFunction]` and a very detailed description.
  - [ ] **Example Description:** "Gets data for a report. 'reportName' is the page name. 'queryType' can be 'top', 'max', or 'min'. 'parametersJson' is for filters. 'language' is the language code (e.g., 'en', 'vi') for the response."
- [ ] Implement the internal logic of `GetReportDataAsync` to parse parameters and build the query.
- [ ] In the final prompt to the LLM for summarizing the data, include an instruction to "Respond in the language: {language}".
- [ ] The final output from the function should be a **JSON string** representing a rich message (e.g., a table with headers and data).
- [ ] In `Program.cs`, import this skill into the Semantic Kernel instance. 