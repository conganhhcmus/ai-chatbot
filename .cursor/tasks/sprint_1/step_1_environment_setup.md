# Task 1.1: Environment & Project Setup

**Goal:** Establish the foundational frontend and backend projects, databases, and configurations.

## Checklist

- [x] **1.1.1: Backend (.NET 8 / C#) Setup**
  - [x] Initialize a new ASP.NET Core Web API project.
  - [x] **Architecture Note:** Organize the project into vertical feature modules (e.g., `/Features/Chat`, `/Features/Reporting`).
  - [x] Add core NuGet packages: `Microsoft.AspNetCore.SignalR`, `Microsoft.EntityFrameworkCore.Design`, `Microsoft.EntityFrameworkCore.SqlServer`, `Microsoft.SemanticKernel`, `Microsoft.SemanticKernel.Connectors.Qdrant`.
  - [x] Configure `Program.cs` with a CORS policy to allow the Next.js frontend's origin URL.
  - [x] Set up `appsettings.Development.json` for local database connection strings.
  - [x] Initialize User Secrets (`dotnet user-secrets init`) and store the OpenAI API Key.
- [x] **1.1.2: Frontend (Next.js) Setup**
  - [x] Initialize a new Next.js project with the TypeScript template.
  - [x] Install and configure Tailwind CSS.
  - [x] Create the initial project directory structure.
  - [x] Install the SignalR client library.
  - [x] Implement a mechanism to generate and store a persistent `UserID` in `localStorage`.
- [ ] **1.1.3: Database & Services (Docker Compose)**
  - [x] Create a single `docker-compose.yml` file to define and manage both the SQL Server and Qdrant services.
  - [ ] Run `docker-compose up -d` to start both containers. (Blocked: Docker not running)
- [ ] **1.1.4: Database Schema (SQL Server & EF Core)**
  - [x] Define the C# entity: `ChatMessage` (with `Id`, `UserId`, `Content`, `Sender`, and `Timestamp`).
  - [x] Create the `ApplicationDbContext.cs` file with a `DbSet` for `ChatMessages`.
  - [x] Register the `DbContext` in the `Program.cs` dependency injection container.
  - [x] Use the EF Core CLI to generate the initial migration.
  - [ ] Apply the initial migration. (Blocked: Docker not running) 