namespace AI.Chatbot.Server.Data
{
    public class ChatMessage
    {
        public int Id { get; set; }
        public required string UserId { get; set; }
        public required string Content { get; set; }
        public required string Sender { get; set; } // "User" or "Bot"
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}