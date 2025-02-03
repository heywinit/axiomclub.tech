import Hero from "@/app/home/hero/Hero";
import Leadership from "@/app/home/leadership/Leadership";
import WhatWeDo from "@/app/home/what-we-do/WhatWeDo";
import FeaturedProjects from "@/app/home/featured-projects/FeaturedProjects";
import Team from "@/app/home/team/Team";
import News from "@/app/home/news/News";
import Contact from "@/app/home/contact/Contact";

export default function Home() {
  return (
    <main className="flex flex-col gap-24 relative">
      {/* Hero Section - Full height */}
      <section className="min-h-screen">
        <Hero />
      </section>

      {/* Main Content Sections */}
      <div className="flex flex-col gap-32">
        <WhatWeDo />
        <Team />
        <FeaturedProjects />
        <Leadership />
        <News />
        <Contact />
      </div>
    </main>
  );
}
