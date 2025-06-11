# Task 1.2: Real-time Communication Layer (SignalR)

**Goal:** Implement a robust, full-duplex communication channel between the frontend and backend.

## Checklist

- [x] **1.2.1: Backend (SignalR Hub)**
  - [x] Create `ChatHub.cs` inheriting from `Hub`.
  - [x] Implement the `UserSendMessage(string userId, string message, string language)`.
  - [x] Implement `OnConnectedAsync` and `OnDisconnectedAsync`.
  - [x] Map the hub's endpoint in `Program.cs`.
- [x] **1.2.2: Frontend (SignalR Service Hook)**
  - [x] In the main app, detect and store the user's language (e.g., from browser settings).
  - [x] Create a `useChat.ts` custom React hook.
  - [x] Configure the SignalR client for **automatic reconnection**.
  - [x] When calling the `sendMessage` function, pass the user's message and their selected language.
  - [x] Set up a listener `connection.on("ReceiveBotMessage", ...)` to handle incoming structured JSON messages.
  - [x] Expose connection state, messages array, and a `sendMessage` function from the hook. 