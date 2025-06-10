# Task 3.2: Administration Features

**Goal:** Build a secure backend and UI for managing chatbot configuration and monitoring conversations.

## Checklist

- [ ] **Backend (Admin API)**
  - [ ] Create `AdminController.cs` secured with an authorization policy.
  - [ ] Implement REST endpoints for CRUD on knowledge documents.
  - [ ] Implement REST endpoints for viewing chat history.
  - [ ] **New:** Implement REST endpoints for CRUD on `InitialActionButtons`.
  - [ ] **New:** Create a database table to store the initial action buttons (label, payload).
- [ ] **Frontend (Admin UI)**
  - [ ] Create a new route group `/admin`.
  - [ ] Build a UI for uploading/managing knowledge files.
  - [ ] Build a UI for viewing user chat logs.
  - [ ] **New:** Build a UI for adding, editing, and deleting the initial action buttons that appear when a user starts a chat. 