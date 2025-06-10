# System Structure

This document outlines the planned folder structure for the project, reflecting the separation of frontend and backend concerns and the use of Vertical Slice Architecture in the backend.

## Project Root: `ai-chatbot`
```
/ai-chatbot
├── .cursor/
│   ├── memory/
│   └── tasks/
├── ai-chatbot-client/
├── ai-chatbot-server/
├── docker-compose.yml
└── README.md
```

## Frontend: `ai-chatbot-client` (Next.js)
```
/ai-chatbot-client
├── app/
├── components/
│   ├── ChatWindow.tsx
│   ├── MessageRenderer.tsx
│   └── ActionButtons.tsx
├── hooks/
│   └── useChat.ts
└── lib/
```

## Backend: `ai-chatbot-server` (.NET)
```
/ai-chatbot-server
├── Features/
│   ├── ChatFeature/
│   │   └── ChatHub.cs
│   ├── ReportingFeature/
│   │   ├── ReportingSkill.cs
│   │   └── ExportController.cs
│   └── AdminFeature/
│       └── AdminController.cs
├── Program.cs
└── appsettings.json
``` 