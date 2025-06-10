# Task 1.3: Core Chat Interface (Frontend)

**Goal:** Build a user-facing chat component that can render rich, interactive messages.

## Checklist

- [ ] **1.3.1: Rich Message Component**
  - [ ] Create a `MessageRenderer.tsx` component that receives a structured message object.
  - [ ] This component will use a `switch` statement on the message `type` to render different sub-components.
  - [ ] **Sub-component:** A Markdown renderer (using a library like `react-markdown`) for formatted text.
  - [ ] **Sub-component:** An `ActionButtons.tsx` component that renders a list of clickable buttons. When a button is clicked, it should send the button's payload as a new message to the hub.
  - [ ] **Sub-component:** A `TableRenderer.tsx` for displaying tabular data.
- [ ] **1.3.2: Main Interface**
  - [ ] Develop the `FloatingBubble.tsx` and `ChatWindow.tsx` components.
  - [ ] The `MessageList.tsx` component should now use `MessageRenderer.tsx` for each message.
  - [ ] Develop the `MessageInput.tsx` component.
- [ ] **1.3.3: Initial State**
  - [ ] On chat window open, fetch the initial, admin-configured action buttons from a new backend endpoint.
  - [ ] Use the `useChat` hook in the main page/layout.
  - [ ] Manage the `ChatWindow` visibility state.
  - [ ] Pass messages and `sendMessage` function to the appropriate components.
  - [ ] Implement auto-scrolling to the latest message. 