export interface Members {
  name: string;
  role: string;
  image: string;
  bio: string;
  skills: string[];
  links?: {
    github?: string;
    linkedin?: string;
    email?: string;
    portfolio?: string;
  };
}

export const teamService = {
  getTeam: (): Members[] => [
    {
      name: "Vinesh Rajpurohit",
      role: "Founder & Leader",
      image: "/team/vinesh.jpg",
      bio: "Usually writing code for screens, sometimes it also makes stuff fly",
      skills: ["Full Stack", "Avionics" , "competitive programming"],
      links: {
        github: "https://github.com/heywinit",
        linkedin: "https://www.linkedin.com/in/vinesh-rajpurohit/",
        email: "vinesh@axiomclub.tech"
      },
    },

    {
      name: "Vaidehi Shah",
      role: "Frontend Lead",
      image: "/team/vaidehi.jpg",
      bio: "Cooking, but not in the kitchen tho.",
      skills: ["UI/UX", "Frontend" , "3D-Animation"],
      links: {
        github: "https://github.com/VaidehiCodes",
        linkedin: "https://www.linkedin.com/in/vaidehi-shah21/",
        email: "vaidehi@axiomclub.tech"
      },
    },

    {
      name: "Deepraj Bhati",
      role: "Backend Lead",
      image: "/team/deepraj.jpg",
      bio: "I do not read terms and services",
      skills: ["Backend" , "Architecture" , "AI/ML"],
      links: {
        github: "https://github.com/byedeep",
        linkedin: "https://www.linkedin.com/in/deepraj-bhati-0210a4330/",
        email: "deep@axiomclub.tech"
      },
    },
  ],
};
