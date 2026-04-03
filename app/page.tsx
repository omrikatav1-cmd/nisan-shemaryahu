import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import DiagnosticWizard from "@/components/DiagnosticWizard";
import Works from "@/components/Works";
import LeadMagnet from "@/components/LeadMagnet";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top" className="flex-1">
        <Hero />

        <SectionDivider accentColor="#3B82F6" />
        <TrustBar />
        <SectionDivider accentColor="#D4AF37" />

        <Services />

        <SectionDivider accentColor="#3B82F6" />
        <DiagnosticWizard />

        <SectionDivider accentColor="#D4AF37" />
        <Works />

        <LeadMagnet />

        <SectionDivider accentColor="#3B82F6" />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
