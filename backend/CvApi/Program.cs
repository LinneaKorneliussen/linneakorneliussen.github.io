var builder = WebApplication.CreateBuilder(args);

// ===== CORS =====
// Hämta frontend URL från miljövariabel, fallback till localhost
var frontendUrl = Environment.GetEnvironmentVariable("FRONTEND_URL") 
                  ?? "http://localhost:5173";

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            // Tillåt alla Vercel deploys som börjar med ditt projektnamn
            .SetIsOriginAllowed(origin =>
                origin.StartsWith("https://linneakorneliussen-github"))
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// ===== Services =====
builder.Services.AddHttpClient<GitHubService>();
builder.Services.AddSingleton<CVService>();

var app = builder.Build();

// ===== Middleware =====
app.UseCors("AllowFrontend");

// ===== Endpoints =====
app.MapGet("/api/cv", (CVService cvService) => cvService.GetCV());
app.MapGet("/api/github-projects", async (GitHubService gitHubService) =>
    await gitHubService.GetProjectsAsync());
app.MapGet("/api/github-readme/{repoName}", async (string repoName, GitHubService gitHubService) =>
{
    var readme = await gitHubService.GetReadmeAsync(repoName);
    return readme is null ? Results.NotFound(new { message = "README not found" }) : Results.Ok(readme);
});

// ===== Optional: Health endpoint för test =====
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

// ===== Lyssna på Render-porten =====
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000"; 
app.Urls.Add($"http://0.0.0.0:{port}");

app.Run();
