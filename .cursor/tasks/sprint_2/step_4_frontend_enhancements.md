# Task 2.4: Frontend UI Enhancements

**Goal:** Improve the user experience with more informative and interactive UI elements.

## Checklist

- [x] **Unread Badge:**
  - [x] Implement `unreadCount` state in the `useChat` hook.
  - [x] Render a badge on the `FloatingBubble` based on the `unreadCount`.
- [x] **Cancellation UI:**
  - [x] Implement a `loading` or `isQueryInProgress` state in the `useChat` hook.
  - [x] When this state is true, display a "Cancel" button in the chat interface.
  - [x] When the "Cancel" button is clicked, call the `CancelRequest` method on the SignalR hub.
- [x] **(Optional) Rich Components:**
  - [x] Define a JSON structure for rich components (e.g., data tables) and render them dynamically. 