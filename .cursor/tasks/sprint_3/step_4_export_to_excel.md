# Task 3.4: Export to Excel

**Goal:** Allow users to download report data presented by the chatbot as an Excel file.

## Checklist

- [x] **Backend:**
  - [x] Add the `ClosedXML` NuGet package to the backend project.
  - [x] Create a new REST API endpoint (e.g., in an `ExportController`), like `GET /api/export/excel`.
  - [x] This endpoint should accept parameters that define the report query (e.g., `reportName`, `parametersJson`).
  - [x] Implement logic to fetch the data, generate an `.xlsx` file in memory using `ClosedXML`, and return it as a `FileStreamResult`.
- [x] **Frontend:**
  - [x] When the chatbot displays a report, also show an "Export to Excel" button.
  - [x] When the button is clicked, construct the URL for the export API with the correct query parameters and trigger a download (e.g., by setting `window.location.href`). 