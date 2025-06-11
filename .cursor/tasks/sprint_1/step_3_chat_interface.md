# Task 1.3: Core Chat Interface (Frontend)

**Goal:** Build a user-facing chat component that can render rich, interactive messages.

## Checklist

- [x] **1.3.1: Rich Message Component**
  - [x] Create a `MessageRenderer.tsx` component that receives a structured message object.
  - [x] This component will use a `switch` statement on the message `type` to render different sub-components.
  - [x] **Sub-component:** A Markdown renderer (using a library like `react-markdown`) for formatted text.
  - [x] **Sub-component:** An `ActionButtons.tsx` component that renders a list of clickable buttons. When a button is clicked, it should send the button's payload as a new message to the hub.
  - [x] **Sub-component:** A `TableRenderer.tsx` for displaying tabular data.
- [x] **1.3.2: Main Interface**
  - [x] Develop the `FloatingBubble.tsx` and `ChatWindow.tsx` components.
  - [x] The `MessageList.tsx` component should now use `MessageRenderer.tsx` for each message.
  - [x] Develop the `MessageInput.tsx` component.
- [x] **1.3.3: Initial State**
  - [x] On chat window open, fetch the initial, admin-configured action buttons from a new backend endpoint.
  - [x] Use the `useChat` hook in the main page/layout.
  - [x] Manage the `ChatWindow` visibility state.
  - [x] Pass messages and `sendMessage` function to the appropriate components.
  - [x] Implement auto-scrolling to the latest message. 