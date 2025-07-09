import MicrocreditHero from "./sections/MicrocreditHero";
import Navbar from "./sections/Navbar";
import ServicesSection from "./sections/ServicesSection";
import Testimonials from "./sections/Testimonials";
import WhoWeAre from "./sections/WhoWeAre";
import WhyChooseUs from "./sections/WhyChooseUs";

export default function Home() {
  return (
    <section className="flex flex-col min-w-fit min-h-screen">
      <Navbar />
      <MicrocreditHero />
      <ServicesSection />
      <WhyChooseUs />
      <WhoWeAre />
      <Testimonials />
    </section>
  );
}
