import { AboutSection } from "@/components/home/AboutSection";
import { CTASection } from "@/components/home/CTASection";
import { ExpectSection } from "@/components/home/ExpectSection";
import { Hero } from "@/components/home/Hero";
import { OutcomesStrip } from "@/components/home/OutcomesStrip";
import { SiteHeader } from "@/components/home/SiteHeader";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)]">
      <SiteHeader />
      <Hero />
      <OutcomesStrip />
      <AboutSection />
      <ExpectSection />
      <CTASection />
    </main>
  );
}
