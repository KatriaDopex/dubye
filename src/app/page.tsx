import HeroSection from "@/components/sections/HeroSection";
import StatsBar from "@/components/sections/StatsBar";
import DestinationCards from "@/components/sections/DestinationCards";
import EmailCapture from "@/components/sections/EmailCapture";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsBar />
      <DestinationCards />
      <EmailCapture />
      <Footer />
    </main>
  );
}
