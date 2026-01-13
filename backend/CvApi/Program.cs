var builder = WebApplication.CreateBuilder(args);

// ===== Services =====
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

builder.Services.AddHttpClient<GitHubService>();
builder.Services.AddSingleton<CVService>();

var app = builder.Build();

app.UseCors("AllowFrontend");

// ===== CV endpoint =====
app.MapGet("/api/cv", (CVService cvService) => cvService.GetCV());

// ===== Projects endpoint =====
app.MapGet("/api/github-projects", async (GitHubService gitHubService) =>
{
    var projects = await gitHubService.GetProjectsAsync();
    return projects;
});

// ===== README endpoint =====
app.MapGet("/api/github-readme/{repoName}", async (string repoName, GitHubService gitHubService) =>
{
    var readme = await gitHubService.GetReadmeAsync(repoName);
    if (readme == null)
        return Results.NotFound(new { message = "README not found" });
    
    return Results.Ok(readme);
});

app.Run();
