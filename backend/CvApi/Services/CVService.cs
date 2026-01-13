using System.Collections.Generic;

public class CVService
{
    public CV GetCV()
    {
        return new CV
        {
            Name = "Linnéa Korneliussen",
            Title = "Systemutvecklare / Fullstack-utvecklare",
            About = "Nyfiken och ansvarsstagande systemutvecklare med erfarenhet av applikations- och integrationsutveckling i Microsoft-miljö. Har arbetat med backendutveckling i C#, API-integrationer och molnbaserade lösningar i Azure.",
            Email = "linneakorneliussen@hotmail.com",
            Phone = "+46721236662",
            Location = "Göteborg, Sverige",
            Github = "https://github.com/LinneaKorneliussen",
            Linkedin = "https://www.linkedin.com/in/linnea-korneliussen-2b011087",
            Skills = new List<Skill>
            {
                new Skill { Name = "C#", Level = 9, Category = "Backend" },
                new Skill { Name = "React", Level = 8, Category = "Frontend" },
                new Skill { Name = "Azure", Level = 8, Category = "Cloud" },
                new Skill { Name = "SQL", Level = 7, Category = "Database" },
                new Skill { Name = "Git", Level = 8, Category = "Tools" },
                new Skill { Name = "CI/CD & DevOps", Level = 7, Category = "Tools" },
            },
            Experience = new List<Experience>
            {
                new Experience
                {
                    Company = "Exsitec",
                    Position = "Trainee, applikation och integration",
                    StartDate = "2025-08",
                    EndDate = "2026-01",
                    Description = "Teknisk trainee-roll med fokus på applikation och integration",
                    Responsibilities = new List<string>
                    {
                        "Fått teknisk grund och förståelse för verksamhetsprocesser",
                        "Arbetat i samarbetsteam",
                        "Bidragit med strukturerat arbetssätt och problemlösning"
                    }
                },
                new Experience
                {
                    Company = "H&M",
                    Position = "Säljare",
                    StartDate = "2014-05",
                    EndDate = "2025-07",
                    Description = "Arbete med kundservice och försäljning",
                    Responsibilities = new List<string>
                    {
                        "Kundservice och försäljning"
                    }
                },
                new Experience
                {
                    Company = "H&M",
                    Position = "Avdelningschef",
                    StartDate = "2018-03",
                    EndDate = "2019-01",
                    Description = "Ledde avdelning och team",
                    Responsibilities = new List<string>
                    {
                        "Teamledning",
                        "Planering och organisering av avdelningen"
                    }
                },
                new Experience
                {
                    Company = "H&M",
                    Position = "Driftsansvarig",
                    StartDate = "2016-11",
                    EndDate = "2022-09",
                    Description = "Ansvar för drift",
                    Responsibilities = new List<string>
                    {
                        "Drift och underhåll av butiken"
                    }
                },
            },
            Education = new List<Education>
            {
                new Education
                {
                    School = "Högskolan i Borås",
                    Degree = "Kandidatexamen, Dataekonomutbildningen",
                    StartDate = "2022-08",
                    EndDate = "2025-06"
                },
                new Education
                {
                    School = "Hochschule München, Tyskland",
                    Degree = "Utbytesstudier, IT och ekonomi",
                    StartDate = "2024-03",
                    EndDate = "2024-07"
                }
            }
        };
    }
}
