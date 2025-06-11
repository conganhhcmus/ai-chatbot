# Task 2.2: Implementing the Planner with Cancellation (Backend)

**Goal:** Use a dynamic planner that generates rich, multi-lingual responses and supports cancellation.

## Checklist

- [x] **Planner & Prompting:**
  - [x] Before calling the planner, create a prompt that instructs the AI to "Respond in the language: {language}" and to "Format your response as a structured JSON object. For simple text, use `{'type': 'text', 'content': '...'}`. If you show data, use `{'type': 'table', ...}`. If you need to ask a question, use `{'type': 'textWithActions', 'actions': [...]}`."
  - [x] Provide this prompt along with the user's goal to the planner.
- [x] **Cancellation Logic:**
  - [x] In `ChatHub`, generate a `CancellationTokenSource` for each call.
  - [x] Store the `CancellationTokenSource` in a dictionary, keyed by `UserId`.
  - [x] Pass the `CancellationToken` to the `plan.InvokeAsync()` call.
  - [x] Implement a `CancelRequest` SignalR method to trigger the cancellation.
  - [x] Ensure proper disposal of the `CancellationTokenSource`. 