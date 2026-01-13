using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;

public class GitHubService
{
    private readonly HttpClient _httpClient;
    private readonly string _username = "LinneaKorneliussen";

    public GitHubService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.DefaultRequestHeaders.Add("User-Agent", "MyPortfolioApp");
    }

    public async Task<List<Project>> GetProjectsAsync()
    {
        try
        {
            var url = $"https://api.github.com/users/{_username}/repos";
            var repos = await _httpClient.GetFromJsonAsync<List<GitHubRepo>>(url);

            if (repos == null) return new List<Project>();

            var projects = new List<Project>();

            foreach (var r in repos)
            {
                // Hämta README
                string? readme = await GetReadmeAsync(r.Name);

                // Parsar team från README
                var team = ParseTeamFromReadme(readme);

                projects.Add(new Project
                {
                    Id = r.Id.ToString(),
                    Title = r.Name,
                    Description = string.IsNullOrEmpty(r.Description) ? "Ingen beskrivning" : r.Description,
                    GithubUrl = r.Html_Url,
                    LiveUrl = r.Topics != null && r.Topics.Contains("web") 
                        ? $"https://linneakorneliussen.github.io/{r.Name}" 
                        : null,
                    Technologies = r.Topics ?? new List<string>(),
                    Featured = false,
                    CompletedDate = r.Pushed_At?.ToString("yyyy-MM-dd") ?? DateTime.Now.ToString("yyyy-MM-dd"),
                    ImageUrl = "https://pngimg.com/uploads/github/github_PNG28.png",
                    Team = team
                });
            }

            return projects;
        }
        catch
        {
            return new List<Project>();
        }
    }

    public async Task<string?> GetReadmeAsync(string repoName)
    {
        try
        {
            var url = $"https://api.github.com/repos/{_username}/{repoName}/readme";
            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                return null;

            var json = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(json);
            var contentBase64 = doc.RootElement.GetProperty("content").GetString();

            if (contentBase64 == null) return null;

            var bytes = Convert.FromBase64String(contentBase64);
            return Encoding.UTF8.GetString(bytes);
        }
        catch
        {
            return null;
        }
    }

    private List<TeamMember> ParseTeamFromReadme(string? readme)
    {
        var team = new List<TeamMember>();
        if (string.IsNullOrEmpty(readme)) return team;

        // Hitta team-avsnittet i markdown
        // Förväntar format:
        // ## Team
        // - [Namn](https://github.com/username)
        var teamSection = Regex.Match(readme, @"## Team\s*(.+?)(##|$)", RegexOptions.Singleline);
        if (!teamSection.Success) return team;

        var lines = teamSection.Groups[1].Value.Split('\n');
        foreach (var line in lines)
        {
            var match = Regex.Match(line, @"\-\s*\[(.+?)\]\((https?://github\.com/.+?)\)");
            if (match.Success)
            {
                team.Add(new TeamMember
                {
                    Name = match.Groups[1].Value.Trim(),
                    Github = match.Groups[2].Value.Trim()
                });
            }
        }

        return team;
    }
}

// GitHub API repo
public class GitHubRepo
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Html_Url { get; set; }
    public string Description { get; set; }
    public List<string> Topics { get; set; }
    public DateTime? Pushed_At { get; set; }
}

// Teammedlem
public class TeamMember
{
    public string Name { get; set; }
    public string Github { get; set; }
}
