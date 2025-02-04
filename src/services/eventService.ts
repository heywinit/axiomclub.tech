interface Project {
  name: string;
  progress: number;
  tech: string;
}

interface TechStack {
  category: string;
  techs: string[];
}

interface Activity {
  date: string;
  event: string;
  details: string;
}

interface Event {
  date: string;
  event: string;
  type: string;
}

interface ClubStat {
  label: string;
  value: string;
}

export const eventService = {
  getActiveProjects: (): Project[] => [
    {
      name: "Axiom Club Website",
      progress: 85,
      tech: "Next.js",
    },
    {
      name: "AI Study Assistant",
      progress: 60,
      tech: "Python/ML",
    },
    {
      name: "Campus Events App",
      progress: 40,
      tech: "React Native",
    },
  ],

  getTechStack: (): TechStack[] => [
    {
      category: "Frontend",
      techs: ["React", "Next.js", "TypeScript"],
    },
    {
      category: "Backend",
      techs: ["Node.js", "Python", "Go"],
    },
    {
      category: "Database",
      techs: ["PostgreSQL", "MongoDB"],
    },
    {
      category: "DevOps",
      techs: ["Docker", "AWS"],
    },
  ],

  getRecentActivities: (): Activity[] => [
    {
      date: "2024-03-15",
      event: "AI Workshop",
      details: "Introduction to Machine Learning",
    },
    {
      date: "2024-03-10",
      event: "Hackathon",
      details: "24-hour coding challenge",
    },
    {
      date: "2024-03-05",
      event: "Tech Talk",
      details: "Web3 and Blockchain",
    },
    {
      date: "2024-03-01",
      event: "Project Sprint",
      details: "Campus Events App Development",
    },
  ],

  getUpcomingEvents: (): Event[] => [
    {
      date: "MAR 20",
      event: "React Workshop",
      type: "Workshop",
    },
    {
      date: "MAR 25",
      event: "Code Review Session",
      type: "Meeting",
    },
    {
      date: "APR 01",
      event: "Spring Hackathon",
      type: "Event",
    },
  ],

  getClubStats: (): ClubStat[] => [
    { label: "Active Members", value: "42" },
    { label: "Project Teams", value: "8" },
    { label: "Monthly Events", value: "4" },
    { label: "Total Projects", value: "15" },
  ],

  getSocialLinks: () => ({
    discord: "discord.gg/axiomclub",
    github: "github.com/axiomclub",
  }),
};
