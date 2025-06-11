using Microsoft.AspNetCore.SignalR;
using AI.Chatbot.Server.Data;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Memory;
using Microsoft.SemanticKernel.Connectors.Qdrant;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using System;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.Extensions.Configuration;
using AI.Chatbot.Server.Features.Reporting;
using Microsoft.SemanticKernel.Planning.Handlebars;
using System.Collections.Concurrent;
using Microsoft.EntityFrameworkCore;

namespace AI.Chatbot.Server.Hubs
{
    public class ChatHub : Hub
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        private static readonly ConcurrentDictionary<string, CancellationTokenSource> _cancellationTokenSources = new();

        public ChatHub(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            // Clean up CancellationTokenSource on disconnect
            if (Context.UserIdentifier != null && _cancellationTokenSources.TryRemove(Context.UserIdentifier, out var cts))
            {
                cts.Dispose();
            }
            await base.OnDisconnectedAsync(exception);
        }

        public async Task UserSendMessage(string userId, string message, string language)
        {
            var userMessage = new ChatMessage
            {
                UserId = userId,
                Content = message,
                Sender = "User",
                Timestamp = DateTime.UtcNow
            };
            _context.ChatMessages.Add(userMessage);
            await _context.SaveChangesAsync();

            var openAIKey = _configuration["OpenAI:ApiKey"];
            if (string.IsNullOrEmpty(openAIKey)) { /* handle error */ return; }

            // Fetch recent chat history
            var history = await _context.ChatMessages
                .Where(m => m.UserId == userId)
                .OrderByDescending(m => m.Timestamp)
                .Take(10)
                .OrderBy(m => m.Timestamp)
                .Select(m => $"{m.Sender}: {m.Content}")
                .ToListAsync();

            var chatHistory = string.Join("\n", history);

            var builder = Kernel.CreateBuilder().AddOpenAIChatCompletion("gpt-3.5-turbo", openAIKey);
            builder.Plugins.AddFromType<ReportingSkill>();
            var kernel = builder.Build();

            var cts = new CancellationTokenSource();
            _cancellationTokenSources[userId] = cts;

            try
            {
                var planner = new HandlebarsPlanner(new HandlebarsPlannerOptions { AllowLoops = true });
                var prompt = $@"
                    Chat History:
                    {chatHistory}
                    
                    Goal: {message}
                    Instructions:
                    - Respond in the language: {language}
                    - Format your response as a structured JSON object. 
                    - For simple text, use {{'type': 'text', 'content': '...'}}. 
                    - If you show data, use {{'type': 'table', ...}}.
                ";
                var plan = await planner.CreatePlanAsync(kernel, prompt);
                var result = await plan.InvokeAsync(kernel, cancellationToken: cts.Token);

                var botMessage = new ChatMessage
                {
                    UserId = userId,
                    Content = result,
                    Sender = "Bot",
                    Timestamp = DateTime.UtcNow
                };
                _context.ChatMessages.Add(botMessage);
                await _context.SaveChangesAsync();

                // Assuming the result is the JSON string
                await Clients.Caller.SendAsync("ReceiveBotMessage", result);
            }
            catch (OperationCanceledException)
            {
                await Clients.Caller.SendAsync("ReceiveBotMessage", new { type = "text", content = "Request cancelled.", user = "Bot" });
            }
            finally
            {
                _cancellationTokenSources.TryRemove(userId, out _);
                cts.Dispose();
            }
        }

        public void CancelRequest(string userId)
        {
            if (_cancellationTokenSources.TryGetValue(userId, out var cts))
            {
                cts.Cancel();
            }
        }
    }
}