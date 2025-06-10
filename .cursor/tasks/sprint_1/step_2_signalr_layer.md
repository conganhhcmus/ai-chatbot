# Task 1.2: Real-time Communication Layer (SignalR)

**Goal:** Implement a robust, full-duplex communication channel between the frontend and backend.

## Checklist

- [ ] **1.2.1: Backend (SignalR Hub)**
  - [ ] Create `ChatHub.cs` inheriting from `Hub`.
  - [ ] Implement the `UserSendMessage(string userId, string message, string language)`.
  - [ ] Implement `OnConnectedAsync` and `OnDisconnectedAsync`.
  - [ ] Map the hub's endpoint in `Program.cs`.
- [ ] **1.2.2: Frontend (SignalR Service Hook)**
  - [ ] In the main app, detect and store the user's language (e.g., from browser settings).
  - [ ] Create a `useChat.ts` custom React hook.
  - [ ] Configure the SignalR client for **automatic reconnection**.
  - [ ] When calling the `sendMessage` function, pass the user's message and their selected language.
  - [ ] Set up a listener `connection.on("ReceiveBotMessage", ...)` to handle incoming structured JSON messages.
  - [ ] Expose connection state, messages array, and a `sendMessage` function from the hook. 