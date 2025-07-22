import HeroSection from "./sections/HeroSection";
import ImpactSection from "./sections/ImpactSection";
import MicrocreditHero from "./sections/MicrocreditHero";
import Navbar from "./sections/Navbar";
import OurStory from "./sections/OurStory";
import TransitionCTA from "./sections/TransitionCTA";
import LoanSection from "./sections/WhoWeAre";
import ServicesSection from "./sessaodeoutraspaginas/ServicesSections";

export default function Home() {
  return (
    <section className="flex flex-col min-w-fit min-h-screen">
      <Navbar />
      <MicrocreditHero />
      <OurStory />
      <HeroSection />
      <ImpactSection />
      <LoanSection />
      <ServicesSection />
      <TransitionCTA />
      {/*<ValuesSection />
      <WhyChooseUs />
      <WhoWeAre /> */}
    </section>
  );
}
