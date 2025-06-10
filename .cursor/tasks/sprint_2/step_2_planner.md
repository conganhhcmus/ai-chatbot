# Task 2.2: Implementing the Planner with Cancellation (Backend)

**Goal:** Use a dynamic planner that generates rich, multi-lingual responses and supports cancellation.

## Checklist

- [ ] **Planner & Prompting:**
  - [ ] Before calling the planner, create a prompt that instructs the AI to "Respond in the language: {language}" and to "Format your response as a structured JSON object. For simple text, use `{'type': 'text', 'content': '...'}`. If you show data, use `{'type': 'table', ...}`. If you need to ask a question, use `{'type': 'textWithActions', 'actions': [...]}`."
  - [ ] Provide this prompt along with the user's goal to the planner.
- [ ] **Cancellation Logic:**
  - [ ] In `ChatHub`, generate a `CancellationTokenSource` for each call.
  - [ ] Store the `CancellationTokenSource` in a dictionary, keyed by `UserId`.
  - [ ] Pass the `CancellationToken` to the `plan.InvokeAsync()` call.
  - [ ] Implement a `CancelRequest` SignalR method to trigger the cancellation.
  - [ ] Ensure proper disposal of the `CancellationTokenSource`. 