#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["AI.Chatbot.Server.csproj", "."]
RUN dotnet restore "./AI.Chatbot.Server.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "AI.Chatbot.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AI.Chatbot.Server.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
# Copy development certificate
COPY aspnetapp.pfx ./
ENV ASPNETCORE_Kestrel__Certificates__Default__Password=!1234567890aA
ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/app/aspnetapp.pfx
ENTRYPOINT ["dotnet", "AI.Chatbot.Server.dll"] 