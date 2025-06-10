# Task 1.4: RAG Implementation (Backend)

**Goal:** Integrate Semantic Kernel and Qdrant to enable the chatbot to answer questions from a knowledge base.

## Checklist

- [ ] **1.4.1: Semantic Kernel Configuration**
  - [ ] Create a service (e.g., `KernelService.cs`) to configure the Kernel instance.
  - [ ] Register Kernel with OpenAI Chat Completion and Text Embedding services.
  - [ ] Configure and register the `QdrantMemoryStore` connector.
- [ ] **1.4.2: Data Ingestion Tool**
  - [ ] Create a separate Console Application project `DataIngestor`.
  - [ ] Implement logic to read text files from a local directory.
  - [ ] Implement text-chunking logic for large documents.
  - [ ] Use the Kernel to generate embeddings and save them to Qdrant.
- [ ] **1.4.3: RAG Query Pipeline in ChatHub**
  - [ ] In `UserSendMessage`, save the user's message to SQL Server, associated with their `UserId`.
  - [ ] Use `kernel.Memory.SearchAsync` to query Qdrant for context.
  - [ ] Create a prompt template that combines the user query and the retrieved context.
  - [ ] Invoke the LLM with the complete prompt.
  - [ ] Save the bot's final response to SQL Server, associated with the `UserId`.
  - [ ] Send the response back to the client via SignalR. 