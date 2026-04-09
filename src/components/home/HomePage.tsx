import { HomeAboutSection } from "@/components/home/HomeAboutSection";
import { HomeBackground } from "@/components/home/HomeBackground";
import { HomeContactSection } from "@/components/home/HomeContactSection";
import { HomeHeader } from "@/components/home/HomeHeader";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeNewClientsSection } from "@/components/home/HomeNewClientsSection";
import { HomePhilosophySection } from "@/components/home/HomePhilosophySection";
import { HomeServicesSection } from "@/components/home/HomeServicesSection";
export function HomePage() {
  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--background)", color: "var(--text)" }}
    >
      <HomeBackground />

      <div className="relative z-10">
        <HomeHeader />
        <HomeHero />
        <HomeAboutSection />
        <HomePhilosophySection />
        <HomeServicesSection />
        <HomeNewClientsSection />
        <HomeContactSection />
      </div>
    </main>
  );
}
