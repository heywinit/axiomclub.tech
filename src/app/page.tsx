import Hero from "@/app/home/hero/Hero";
import WhatWeDo from "@/app/home/what-we-do/WhatWeDo";
import FeaturedProjects from "@/app/home/featured-projects/FeaturedProjects";
import Team from "@/app/home/team/Team";
import News from "@/app/home/news/News";
import Contact from "@/app/home/contact/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatWeDo />
      <FeaturedProjects />
      <Team />
      <News />
      <Contact />
    </main>
  );
}
