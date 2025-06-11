# Task 3.3: Non-Functional Requirements & Production Readiness

**Goal:** Harden the system for security, performance, and scalability, and prepare for deployment.

## Checklist

- [x] **Security:**
  - [x] Move all secrets from User Secrets to environment variables or Azure Key Vault.
- [x] **Logging:**
  - [x] Integrate Serilog for structured logging of key events and errors.
- [x] **Scalability:**
  - [x] Add and configure a Redis backplane for SignalR to support horizontal scaling. 