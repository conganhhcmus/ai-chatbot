Alright, to ensure professionalism, here is the Product Requirements Document (PRD) in English, formatted in Markdown, ready for you to use.

---

# Product Requirements Document (PRD)

## 1. Project Overview

* **Project Name:** Intelligent AI Chatbot Platform with RAG & API Integration
* **PRD Creator:** [Your Name/Team]
* **Date Created:** June 10, 2025
* **Version:** 1.0

### 1.1. Summary

This project aims to build an **intelligent and interactive AI chatbot system** directly embedded into a website. The chatbot will appear as a **floating circular bubble** that users can drag and move. Clicking this bubble will open a **chat window** with a user-friendly interface, similar to Facebook Messenger.

The front-end will be developed using **Next.js**, and the back-end will utilize **C# (.NET 8+)**. Key capabilities of this chatbot include:
1.  **Intelligent natural language understanding** from user messages.
2.  **Self-learning and knowledge expansion** through a **Retrieval-Augmented Generation (RAG)** architecture using a **Qdrant** vector database.
3.  **Analyzing requests, extracting standardized parameters**, and **calling internal APIs** to fetch dynamic data (e.g., product information, order details).
4.  **Synthesizing information** from RAG and API data with conversation context to generate **natural and accurate responses** for users.

### 1.2. Project Goals

* Provide an instant, intelligent 24/7 support and interaction channel on the website, enhancing user experience.
* Reduce the load on human support teams by automating common information requests and basic tasks.
* Ensure the chatbot can accurately query and provide up-to-date information from internal business data.
* Establish a modular, scalable, maintainable system architecture that allows for easy AI knowledge updates.

---

## 2. Target Audience

* **Website Visitors:** The end-users of the chatbot who seek information, support, or wish to perform automated tasks.
* **Administrators/Business Owners:** Individuals responsible for managing the chatbot's knowledge content, monitoring chat history, and analyzing chatbot performance.

---

## 3. Key Features (User Stories)

### 3.1. Front-end Features (Next.js)

* **Chatbot Bubble (Floating Bubble):**
    * As a user, I see a **floating circular icon** on the webpage (defaulting to the bottom-right corner).
    * As a user, I can **drag and move** this chatbot icon around the screen.
    * As a user, I can **click the icon** to open/close the chat window.
    * As a user, I see a **unread message count** (badge) on the chatbot icon when there are new messages from the chatbot.
* **Chat Window:**
    * As a user, when I open the chat window, I see a familiar, intuitive interface, similar to **Facebook Messenger**, displaying chat history.
    * As a user, I can **send text messages** to the chatbot by typing into the input field and pressing Enter or the send button.
    * As a user, I **receive responses** from the chatbot within the chat window instantly.
    * As a user, I can **scroll up to view older messages** in the current session's chat history.
    * As a user, I can **close the chat window** by clicking the icon or a close button.
* **Connection Status:**
    * As a user, I see a notification if the connection to the chatbot is interrupted or restored.

### 3.2. Back-end Features (C# .NET)

* **Chat Session & History Management:**
    * As the back-end, I create and manage **chat sessions** for each unique visiting user.
    * As the back-end, I can store and retrieve the **entire message history** for each chat session in the database to maintain context.
* **Natural Language Understanding & Intent Recognition (NLU/Intent Recognition):**
    * As the back-end, I receive messages from the front-end.
    * As the back-end, I use **Microsoft Semantic Kernel** to connect with an LLM (e.g., OpenAI GPT-4o) to **analyze user intent** and **extract entities/parameters** from user messages.
* **RAG (Retrieval-Augmented Generation) Implementation:**
    * As the back-end, for specific knowledge requests, I use **Semantic Kernel** to search for relevant information in the **Qdrant** vector database based on the user's query.
    * As the back-end, I will pass the retrieved context from Qdrant into the prompt sent to the LLM.
* **API Integration & Dynamic Data Retrieval:**
    * As the back-end, I define **"Skills" / "Plugins" (C# functions)** within Semantic Kernel to represent internal API calls (e.g., `GetProductDetails`, `CheckOrderStatus`).
    * As the back-end, I enable the LLM (via Semantic Kernel's Planner) to automatically decide when to call a Skill/Plugin and pass the extracted parameters.
    * As the back-end, I execute API calls to internal services (e.g., product management system, order system) and receive JSON data.
    * As the back-end, I parse this JSON data and incorporate it into the prompt for the LLM to generate a response.
* **Response Synthesis & Natural Language Generation (NLG):**
    * As the back-end, I synthesize all relevant information: chat history, context from RAG, data from API, and the user's query, into a single comprehensive prompt.
    * As the back-end, I send this prompt to the LLM to generate a natural, intelligent, and relevant response.
* **Real-time API:**
    * As the back-end, I use **ASP.NET Core SignalR** to establish a full-duplex connection with the front-end, enabling real-time message sending and receiving.

### 3.3. Administration Features (Optional for later phases)

* **RAG Knowledge Management (Human-in-the-Loop):**
    * As an administrator, I can add, edit, or delete knowledge documents (text) used for RAG.
    * The system has a controlled process to ingest new documents into the vector database.
* **Chat History Viewing:**
    * As an administrator, I can view the chat history of user conversations with the chatbot for analysis and improvement.

---

## 4. Technical Requirements

### 4.1. Front-end (Next.js)

* **Framework:** Next.js (latest stable version).
* **Language:** TypeScript.
* **UI/UX:** Chatbot interface design similar to Facebook Messenger (bubbles, avatars, timestamps, etc.). Utilize UI component libraries and CSS Frameworks (e.g., Tailwind CSS) for rapid development and responsiveness.
* **Real-time Communication:** Use the client-side **SignalR** library to connect to the C# back-end for instant message sending/receiving.
* **Local Storage:** Utilize `localStorage` or `sessionStorage` to persist the user's chat session ID.

### 4.2. Back-end (C# .NET)

* **Framework:** ASP.NET Core (latest .NET 8+ version) with **ASP.NET Core SignalR**.
* **Language:** C#.
* **AI Orchestration:** **Microsoft Semantic Kernel** for orchestrating LLM, RAG, and Skill/Plugin calls.
* **LLM Integration:** Integration with **OpenAI API** (or Azure OpenAI Service) for Large Language Models (e.g., `gpt-4o`, `gpt-3.5-turbo`).
* **Vector Database (RAG):** **Qdrant** (deployed independently, e.g., via Docker) for storing knowledge vector embeddings.
    * Use **Microsoft.SemanticKernel.Connectors.Qdrant** for interaction.
    * Use **OpenAI Embeddings Model** (e.g., `text-embedding-ada-002`) to generate vector embeddings from text.
* **Relational Database (Chat History & Business Data):** **Entity Framework Core** for interacting with a relational database like **PostgreSQL** (or SQL Server/MySQL) to store chat history and business data (products, orders, etc.).
* **Parameter Extraction & API Calling Logic:** Define **Custom C# Functions (Skills/Plugins)** within Semantic Kernel to handle parameter extraction and calls to your internal APIs.
* **Security:**
    * Configure CORS (Cross-Origin Resource Sharing) to allow connections from the Next.js front-end.
    * Secure API keys (OpenAI, Qdrant) via environment variables or Azure Key Vault.
    * All communication via HTTPS/WSS.

### 4.3. Front-end & Back-end Integration

* **Primary Communication:** Next.js will establish a **SignalR Hub** connection with the C# back-end for real-time message transmission.
* **Auxiliary REST APIs:** ASP.NET Core Web API RESTful HTTP/HTTPS APIs will be called by the C# chatbot back-end to retrieve business data (e.g., `/api/products/{id}`, `/api/orders/{orderId}`).
* **Data Format:** JSON for all data exchange.

---

## 5. Non-Functional Requirements

* **Performance:**
    * Average chatbot response time (from message sent to response received) under **3 seconds**.
    * System capable of supporting at least **500 concurrent chat sessions**.
    * RAG search and API call latency not exceeding **500ms**.
* **Security:**
    * Adherence to best security practices (OWASP Top 10).
    * Encryption of sensitive data (if any) at rest and in transit.
* **Scalability:**
    * C# back-end architecture designed for horizontal scaling to handle increased user load and requests.
    * High-load capacity for the database.
* **Reliability:**
    * Target uptime of **99.9%**.
    * Mechanisms for error handling and recovery in case of connection loss or service failure.
* **AI Accuracy:**
    * Intent and entity recognition accuracy of at least **85%**.
    * Accuracy of information provided from RAG and API must be **100%** (as it relies on the source of truth).
* **Maintainability:**
    * Clean, modularized codebase adhering to good design principles and coding standards.
    * Clear documentation for APIs, Skills/Plugins, and the RAG knowledge management process.

---

## 6. Phased Rollout (Example)

* **Phase 1 (MVP - Basic Chatbot with RAG):**
    * Implement floating chatbot bubble and chat window.
    * Message sending/receiving functionality via SignalR.
    * C# back-end integration with LLM (OpenAI) for general questions.
    * RAG implementation with Qdrant and sample data, allowing the chatbot to answer questions based on static knowledge.
    * Basic chat history storage in the database.
* **Phase 2 (API Integration & Enhanced Intelligence):**
    * Develop and integrate Custom C# Skills/Plugins to call business APIs (e.g., product lookup, order status check).
    * Improve intent analysis and parameter extraction capabilities to trigger correct APIs.
    * Enhance LLM response synthesis logic when combining RAG and API data.
* **Phase 3 (Administration & Expansion):**
    * Build a basic admin interface for adding/updating RAG documents (manual process).
    * Implement features like sentiment analysis (if needed) or integration with other systems.
    * Further performance and scalability optimizations.

---

## 7. Success Metrics

* **Engagement Rate:** At least **70%** of website visitors click the chatbot icon and initiate a chat.
* **Self-service Rate:** At least **60%** of user questions/requests are fully resolved by the chatbot automatically without human intervention.
* **Average Chatbot Response Time:** Under **2 seconds**.
* **User Satisfaction:** Average chatbot rating of **4/5 stars** or higher.
* **Manual Support Request Reduction:** A **20%** reduction in the volume of requests to the human support department within 3 months of deployment.

---