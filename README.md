# AI-Powered Customer Support Chatbot

This project is a sophisticated, AI-driven chatbot designed to provide intelligent, 24/7 customer support. It integrates with a knowledge base to deliver accurate, context-aware responses and offers a seamless user experience with a modern, customizable interface.

## Features

- **Conversational AI:** Utilizes Semantic Kernel with OpenAI's GPT models to understand and respond to user queries in natural language.
- **Knowledge Base Integration:** Fetches information from a vector database (Qdrant) to provide answers based on your documents.
- **Admin Dashboard:** A secure area for administrators to:
  - Manage knowledge base documents (upload/update/delete).
  - View chat history across all users.
  - Configure the initial action buttons presented to users.
- **Real-time & Scalable:** Built with SignalR and a Redis backplane for instant, horizontally scalable, real-time communication.
- **Export Functionality:** Admins can export chat reports to Excel.
- **Customizable UI:** The chat widget can be easily embedded and styled.

## Technology Stack

- **Backend:**
  - C# with ASP.NET Core 8
  - Semantic Kernel for AI orchestration
  - Entity Framework Core for database interaction
  - SignalR with Redis Backplane for real-time web sockets
  - Qdrant for vector storage
  - Serilog for structured logging
- **Frontend:**
  - TypeScript with Next.js 14 (React)
  - Tailwind CSS for styling
- **Infrastructure:**
  - SQL Server for relational data
  - Qdrant for vector data
  - Redis for caching and message brokering
  - Docker & Docker Compose for containerization

## Project Structure

```
/ai-chatbot
├── ai-chatbot-client/       # Next.js frontend application
├── ai-chatbot-server/       # ASP.NET Core backend server
└── docker-compose.yml     # Docker configuration for all services
```

## Getting Started

### Prerequisites

- Docker and Docker Compose
- An OpenAI API Key

### How to Run

The entire application stack is configured to run with Docker Compose.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd ai-chatbot
    ```

2.  **Configure Environment Variables:**
    The backend service requires an OpenAI API key. This is configured in the `docker-compose.yml` file. Find the following line and replace `"your-openai-api-key"` with your actual key:

    ```yaml
    # In docker-compose.yml
    ...
    environment:
      - "OpenAI__ApiKey=your-openai-api-key" # <-- Replace this value
    ...
    ```
    All other services (SQL Server, Qdrant, Redis) and their connections are pre-configured in the `docker-compose.yml` file for a development environment.

3.  **Run with Docker Compose:**
    From the root directory of the project, start all services:
    ```bash
    docker-compose up --build
    ```
    This command will build the container images and start the API server, the Next.js client, SQL Server, Qdrant, and Redis.

4.  **Accessing the Application:**
    - **Chatbot UI:** `http://localhost:3000`
    - **Admin Login:** `http://localhost:3000/admin/login`
    - **Backend API (Swagger):** `http://localhost:7043/swagger`

## Environment Variables

For production or more advanced setups, the following environment variables are used for the `api` service:

| Variable                               | Description                                        | Default in `docker-compose.yml`           |
| -------------------------------------- | -------------------------------------------------- | ----------------------------------------- |
| `ASPNETCORE_ENVIRONMENT`               | The runtime environment.                           | `Development`                             |
| `ASPNETCORE_URLS`                      | The URLs the web server will bind to.              | `https://+:8081;http://+:8080`            |
| `ConnectionStrings__DefaultConnection` | The connection string for the SQL Server database. | `Server=sql-server-db;...`                |
| `ConnectionStrings__Redis`             | The connection string for the Redis cache.         | `redis:6379`                              |
| `OpenAI__ApiKey`                       | **REQUIRED.** Your API key for OpenAI services.    | `your-openai-api-key`                     |
| `Jwt__Key`                             | The secret key used for signing JWT tokens.        | A default is in `appsettings.Development` |
| `Jwt__Issuer`                          | The issuer for the JWT tokens.                     | A default is in `appsettings.Development` |
| `Jwt__Audience`                        | The audience for the JWT tokens.                   | A default is in `appsettings.Development` |


## Frontend Environment Variables

The frontend application uses a `.env.local` file for its environment variables. Create this file in the `ai-chatbot-client` directory. Currently, there are no required environment variables for the default setup, but you can add them here as needed.

Example `.env.local` file:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:7043
```

## API Usage

The backend exposes a REST API for the frontend client and for administrative purposes. The full API specification can be explored via Swagger at `http://localhost:7043/swagger`.

### Admin API

All admin endpoints are prefixed with `/api/admin` and require a valid JWT Bearer token with an "Admin" role.

-   **`GET /api/admin/health`**: Checks the health of the admin endpoint.
-   **`GET /api/admin/knowledge`**: Retrieves a list of all knowledge base documents.
-   **`POST /api/admin/knowledge`**: Uploads a new knowledge document (multipart/form-data).
-   **`PUT /api/admin/knowledge/{id}`**: Updates an existing knowledge document.
-   **`DELETE /api/admin/knowledge/{id}`**: Deletes a knowledge document and its associated vector embeddings.
-   **`GET /api/admin/chathistory`**: Retrieves all chat messages, grouped by user.
-   **`POST /api/export/excel`**: Exports the chat history to an Excel file.

## Admin Credentials

-   **Username:** `admin`
-   **Password:** `Admin123!`