var builder = WebApplication.CreateBuilder(args);

// ===== CORS =====
var frontendUrl = Environment.GetEnvironmentVariable("FRONTEND_URL") 
                  ?? "http://localhost:5173";

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .SetIsOriginAllowed(origin =>
                origin == "http://localhost:5173" ||
                origin.StartsWith("https://linneakorneliussen-github"))
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// ===== Services =====
builder.Services.AddHttpClient<GitHubService>();
builder.Services.AddSingleton<CVService>();

// ===== MailService via miljövariabler =====
var smtpHost = Environment.GetEnvironmentVariable("SMTP_HOST") ?? "smtp.example.com";
var smtpPort = int.Parse(Environment.GetEnvironmentVariable("SMTP_PORT") ?? "587");
var smtpUser = Environment.GetEnvironmentVariable("SMTP_USER") ?? "user@example.com";
var smtpPass = Environment.GetEnvironmentVariable("SMTP_PASS") ?? "password";

var mailService = new MailService(smtpHost, smtpPort, smtpUser, smtpPass);

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

// ===== Mail endpoint =====
app.MapPost("/api/mail/send", async (MailRequest request) =>
{
    var result = await mailService.SendEmailAsync(
        request.Email,
        request.Name,
        request.Subject,
        request.Message
    );

    return result
    ? Results.Ok(new { status = "Mail sent successfully" })
    : Results.Json(new { status = "Failed to send mail" }, statusCode: 500);
});

// ===== Health endpoint =====
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

// ===== Lyssna på Render-porten =====
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000"; 
app.Urls.Add($"http://0.0.0.0:{port}");

app.Run();




