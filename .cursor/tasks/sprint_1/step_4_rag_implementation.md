# Task 1.4: RAG Implementation (Backend)

**Goal:** Integrate Semantic Kernel and Qdrant to enable the chatbot to answer questions from a knowledge base.

## Checklist

- [x] **1.4.1: Semantic Kernel Configuration**
  - [x] Create a service (e.g., `KernelService.cs`) to configure the Kernel instance. (Implemented directly in ChatHub)
  - [x] Register Kernel with OpenAI Chat Completion and Text Embedding services.
  - [x] Configure and register the `QdrantMemoryStore` connector.
- [ ] **1.4.2: Data Ingestion Tool**
  - [ ] Create a separate Console Application project `DataIngestor`. (Skipped for now)
  - [ ] Implement logic to read text files from a local directory.
  - [ ] Implement text-chunking logic for large documents.
  - [ ] Use the Kernel to generate embeddings and save them to Qdrant.
- [x] **1.4.3: RAG Query Pipeline in ChatHub**
  - [x] In `UserSendMessage`, save the user's message to SQL Server, associated with their `UserId`.
  - [x] Use `kernel.Memory.SearchAsync` to query Qdrant for context.
  - [x] Create a prompt template that combines the user query and the retrieved context.
  - [x] Invoke the LLM with the complete prompt.
  - [x] Save the bot's final response to SQL Server, associated with the `UserId`.
  - [x] Send the response back to the client via SignalR. 