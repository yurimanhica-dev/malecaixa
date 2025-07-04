import MicrocreditHero from "./sections/MicrocreditHero";
import Navbar from "./sections/Navbar";
import ServicesSection from "./sections/ServicesSection";
import WhoWeAre from "./sections/WhoWeAre";

export default function Home() {
  return (
    <section className="flex flex-col min-w-fit min-h-screen">
      <Navbar />
      <MicrocreditHero />
      <ServicesSection />
      <WhoWeAre />
    </section>
  );
}
