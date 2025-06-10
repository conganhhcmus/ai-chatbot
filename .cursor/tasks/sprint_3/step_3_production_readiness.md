# Task 3.3: Non-Functional Requirements & Production Readiness

**Goal:** Harden the system for security, performance, and scalability, and prepare for deployment.

## Checklist

- [ ] **Security:**
  - [ ] Move all secrets from User Secrets to environment variables or Azure Key Vault.
- [ ] **Logging:**
  - [ ] Integrate Serilog for structured logging of key events and errors.
- [ ] **Scalability:**
  - [ ] Add and configure a Redis backplane for SignalR to support horizontal scaling. 