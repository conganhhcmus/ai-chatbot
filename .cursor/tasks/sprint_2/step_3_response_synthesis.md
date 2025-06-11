# Task 2.3: Advanced Response Synthesis (Backend)

**Goal:** Enhance the planner's context-awareness by including recent chat history.

## Checklist

- [x] Before calling the planner, fetch the message exchanges for the current `UserId` from the last X days from SQL Server.
- [x] Prepend this chat history to the goal provided to the planner to give it conversational context. 