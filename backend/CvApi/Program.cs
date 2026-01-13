

var builder = WebApplication.CreateBuilder(args);

// ===== Frontend URL för CORS =====
// Miljövariabel FRONTEND_URL används om satt, annars default localhost
var frontendUrl = Environment.GetEnvironmentVariable("FRONTEND_URL") 
                  ?? "http://localhost:5173";

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins(frontendUrl, "https://linneakorneliussen.github.io")
              .AllowAnyHeader()
              .AllowAnyMethod());
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
{
    var projects = await gitHubService.GetProjectsAsync();
    return projects;
});

app.MapGet("/api/github-readme/{repoName}", async (string repoName, GitHubService gitHubService) =>
{
    var readme = await gitHubService.GetReadmeAsync(repoName);
    if (readme == null)
        return Results.NotFound(new { message = "README not found" });
    
    return Results.Ok(readme);
});

app.Run();
