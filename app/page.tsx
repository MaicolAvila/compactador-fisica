import HeroSection from "@/components/hero/HeroSection";
import AlgodooSection from "@/components/algodoo/AlgodooSection";
import SimulationSlider from "@/components/simulation/SimulationSlider";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <AlgodooSection />
      <SimulationSlider />
    </main>
  );
}
