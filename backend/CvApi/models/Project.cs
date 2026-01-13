public class Project
{ public string Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public List<string> Technologies { get; set; }
    public string? ImageUrl { get; set; }
    public string? GithubUrl { get; set; }
    public string? LiveUrl { get; set; }
    public bool Featured { get; set; }
    public string CompletedDate { get; set; }
    public List<TeamMember> Team { get; set; } = new List<TeamMember>();
}