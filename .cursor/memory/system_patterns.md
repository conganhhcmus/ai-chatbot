# System Patterns & Architecture

## 1. Backend Architecture
- **Vertical Slice Architecture:** The backend is organized by feature (e.g., `ChatFeature`, `ReportingFeature`) rather than by technical layer (e.g., `Controllers`, `Services`). This improves modularity and maintainability.

## 2. AI & Communication
- **Rich Message Protocol:** Communication from the backend to the frontend is not plain text. It uses a structured JSON format to define the message type (`text`, `table`, `actions`) and content, enabling an interactive UI.
- **Dynamic AI Planner:** The system uses the Semantic Kernel Handlebars Planner to interpret user intent. Instead of having many specific functions, we use one powerful, generic `GetReportDataAsync` skill that the planner populates with parameters.
- **Multi-lingual Prompts:** All prompts sent to the LLM include instructions on the target language and the required JSON output format.

## 3. Data & State Management
- **Persistent User ID:** Chat history is tied to a `UserID` that is generated and stored persistently in the frontend's `localStorage`, allowing for long-term conversation history.
- **Cancellable Tasks:** Long-running backend operations (like reports) use `CancellationToken`s, allowing the user to cancel requests from the UI via a dedicated SignalR method. 