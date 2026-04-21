import FAQSection from "./sections/FAQSection";
import CreditoJa from "./sections/FinancialSolutions";
import HeroSection from "./sections/HeroSection";
import ImpactSection from "./sections/ImpactSection";
import MicrocreditHero from "./sections/MicrocreditHero";
import Navbar from "./sections/Navbar";
import OurStory from "./sections/OurStory";
import TransitionCTA from "./sections/TransitionCTA";
import LoanSection from "./sections/WhoWeAre";

export default function Home() {
  return (
    <section className="overflow-x-hidden">
      <Navbar />
      <MicrocreditHero />
      <OurStory />
      <HeroSection />
      <ImpactSection />
      <LoanSection />
      <CreditoJa />
      <FAQSection />
      <TransitionCTA />
    </section>
  );
}
