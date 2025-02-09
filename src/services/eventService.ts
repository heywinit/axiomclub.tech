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
      progress: 99,
      tech: "Next.js",
    },
    {
      name: "AI Time Manager",
      progress: 35,
      tech: "Next.js / Go",
    },
    /*{
      name: "Campus Events App",
      progress: 40,
      tech: "React Native",
    },*/
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
      date: "2024-09-3",
      event: "Axiom Created",
      details: "The creation of this club",
    },
    {
      date: "2025-02-01",
      event: "Spark Quest",
      details: "Participated in a webpage devloping compititon",
    },
    {
      date: "2025-01-27",
      event: "Tech Talk",
      details: "We started wroking on this website",
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
    { label: "Active Members", value: "24" },
    { label: "Project Teams", value: "1" },
    { label: "Monthly Events", value: "4" },
    { label: "Total Projects", value: "15" },
  ],

  getSocialLinks: () => ({
    discord: "discord.gg/axiomclub",
    github: "https://github.com/axiom-svgu",
  }),
};
