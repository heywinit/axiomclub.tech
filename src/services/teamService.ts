interface Members{
    name: string;
    role: string;
    image: string;
    bio: string;
    skills: string[];
    links: {
        github: string;
        linkedin: string;
        website?: string;
    }
}


export const teamService = {
    getTeam: (): Members[] => [
        {
            name: "Vinesh Rajpurohit",
            role: "Founder & Leader",
            image: "/team/vinesh.jpg",
            bio: "Chakka",
            skills: ["Full Stack", "Avionics"],
            links:{
               github: "https://github.com/heywinit",
                linkedin: "https://www.linkedin.com/in/vinesh-rajpurohit/"

            },

        },

        {
            name: "Vaidehi Shah",
            role: "Frontend Lead",
            image: "/team/vaidehi.jpg",
            bio: "batki",
            skills:["UI/UX" ,"Frontend"],
            links:{
                github: "https://github.com/VaidehiCodes",
                linkedin: "https://www.linkedin.com/in/vaidehi-shah21/",
            }

        },

        {
            name: "Deepraj Bhati",
            role: "Backend Lead",
            image: "/team/deepraj.jpg",
            bio: "Mahan aadmi",
            skills:["Backend"],
            links:{
                github: "https://github.com/byedeep",
                linkedin: "https://www.linkedin.com/in/deepraj-bhati-0210a4330/",
            }

        },

        ]

}