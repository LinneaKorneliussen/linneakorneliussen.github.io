var builder = WebApplication.CreateBuilder(args);

// CORS Configuration (allow all for development purposes only)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Services
builder.Services.AddHttpClient<GitHubService>();
builder.Services.AddSingleton<CVService>();

// MailService
var smtpHost = Environment.GetEnvironmentVariable("SMTP_HOST") ?? "smtp.example.com";
var smtpPort = int.Parse(Environment.GetEnvironmentVariable("SMTP_PORT") ?? "587");
var smtpUser = Environment.GetEnvironmentVariable("SMTP_USER") ?? "user@example.com";
var smtpPass = Environment.GetEnvironmentVariable("SMTP_PASS") ?? "password";

var mailService = new MailService(smtpHost, smtpPort, smtpUser, smtpPass);

var app = builder.Build();
app.UseCors("AllowAll");

// Endpoints
app.MapGet("/api/cv", (CVService cvService) => cvService.GetCV());

app.MapGet("/api/github-projects", async (GitHubService gitHubService) =>
    await gitHubService.GetProjectsAsync());

app.MapGet("/api/github-readme/{repoName}", async (string repoName, GitHubService gitHubService) =>
{
    var readme = await gitHubService.GetReadmeAsync(repoName);
    return readme is null
        ? Results.NotFound(new { message = "README not found" })
        : Results.Ok(readme);
});

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

// Health check endpoint
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
app.Urls.Add($"http://0.0.0.0:{port}");

app.Run();
