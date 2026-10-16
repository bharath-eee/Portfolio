import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { InteractiveSections } from "@/components/sections/interactive-sections";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { PortfolioAssistant } from "@/components/portfolio/portfolio-assistant";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <CustomCursor />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <InteractiveSections />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <PortfolioAssistant />
    </div>
  );
}
