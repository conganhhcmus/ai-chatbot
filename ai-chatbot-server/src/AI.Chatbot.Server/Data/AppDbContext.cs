using Microsoft.EntityFrameworkCore;
using System;

namespace AI.Chatbot.Server.Data
{
    public class InitialActionButton
    {
        public int Id { get; set; }
        public required string Label { get; set; }
        public required string Payload { get; set; }
    }

    public class KnowledgeDocument
    {
        public int Id { get; set; }
        public required string FileName { get; set; }
        public required string Content { get; set; } // Storing content directly for simplicity
        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
    }

    public class Prompt
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Content { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<ChatMessage> ChatMessages { get; set; }
        public DbSet<InitialActionButton> InitialActionButtons { get; set; }
        public DbSet<KnowledgeDocument> KnowledgeDocuments { get; set; }
        public DbSet<Prompt> Prompts { get; set; }
    }
}