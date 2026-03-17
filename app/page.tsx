import HeroSection from "@/components/hero/HeroSection";
import AlgodooSection from "@/components/algodoo/AlgodooSection";
import SimulationSlider from "@/components/simulation/SimulationSlider";
import PhysicsContentSection from "@/components/content/PhysicsContentSection";
import { SimulationStoreProvider } from "@/store/simulationStore";

export default function Home() {
  return (
    <SimulationStoreProvider>
      <main className="relative">
        <HeroSection />
        <SimulationSlider />
        <AlgodooSection />
        <PhysicsContentSection />
      </main>
    </SimulationStoreProvider>
  );
}
