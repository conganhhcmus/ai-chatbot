# Task 1.1: Environment & Project Setup

**Goal:** Establish the foundational frontend and backend projects, databases, and configurations.

## Checklist

- [ ] **1.1.1: Backend (.NET 8 / C#) Setup**
  - [ ] Initialize a new ASP.NET Core Web API project.
  - [ ] **Architecture Note:** Organize the project into vertical feature modules (e.g., `/Features/Chat`, `/Features/Reporting`).
  - [ ] Add core NuGet packages: `Microsoft.AspNetCore.SignalR`, `Microsoft.EntityFrameworkCore.Design`, `Microsoft.EntityFrameworkCore.SqlServer`, `Microsoft.SemanticKernel`, `Microsoft.SemanticKernel.Connectors.Qdrant`.
  - [ ] Configure `Program.cs` with a CORS policy to allow the Next.js frontend's origin URL.
  - [ ] Set up `appsettings.Development.json` for local database connection strings.
  - [ ] Initialize User Secrets (`dotnet user-secrets init`) and store the OpenAI API Key.
- [ ] **1.1.2: Frontend (Next.js) Setup**
  - [ ] Initialize a new Next.js project with the TypeScript template.
  - [ ] Install and configure Tailwind CSS.
  - [ ] Create the initial project directory structure.
  - [ ] Install the SignalR client library.
  - [ ] Implement a mechanism to generate and store a persistent `UserID` in `localStorage`.
- [ ] **1.1.3: Database & Services (Docker Compose)**
  - [ ] Create a single `docker-compose.yml` file to define and manage both the SQL Server and Qdrant services.
  - [ ] Run `docker-compose up -d` to start both containers.
- [ ] **1.1.4: Database Schema (SQL Server & EF Core)**
  - [ ] Define the C# entity: `ChatMessage` (with `MessageId`, `UserId`, `Content`, `Sender`, and `Timestamp`).
  - [ ] Create the `ApplicationDbContext.cs` file with a `DbSet` for `ChatMessages`.
  - [ ] Register the `DbContext` in the `Program.cs` dependency injection container.
  - [ ] Use the EF Core CLI to generate and apply the initial migration. 