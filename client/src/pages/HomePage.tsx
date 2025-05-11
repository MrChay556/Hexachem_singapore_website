import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProductsSection from "@/components/sections/ProductsSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import SustainabilitySection from "@/components/sections/SustainabilitySection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Hexachem (S) Pte Ltd - Innovating Chemical Sustainability</title>
        <meta name="description" content="Hexachem is a Singapore-based chemical recycling and trading company specializing in solvents, fuel oil, and monomers since 2011." />
        <meta property="og:title" content="Hexachem (S) Pte Ltd - Chemical Recycling & Trading" />
        <meta property="og:description" content="Singapore's leader in sustainable chemical solutions including solvents, fuel oil, and monomers since 2011." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hexachem.sg" />
      </Helmet>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <IndustriesSection />
      <SustainabilitySection />
      <ContactSection />
      <Footer />
    </>
  );
}
