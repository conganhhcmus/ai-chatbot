# Task 2.4: Frontend UI Enhancements

**Goal:** Improve the user experience with more informative and interactive UI elements.

## Checklist

- [ ] **Unread Badge:**
  - [ ] Implement `unreadCount` state in the `useChat` hook.
  - [ ] Render a badge on the `FloatingBubble` based on the `unreadCount`.
- [ ] **Cancellation UI:**
  - [ ] Implement a `loading` or `isQueryInProgress` state in the `useChat` hook.
  - [ ] When this state is true, display a "Cancel" button in the chat interface.
  - [ ] When the "Cancel" button is clicked, call the `CancelRequest` method on the SignalR hub.
- [ ] **(Optional) Rich Components:**
  - [ ] Define a JSON structure for rich components (e.g., data tables) and render them dynamically. 