import HeroSection from "@/components/HeroSection";
import { main } from "framer-motion/client";

export default function Home() {
  return (
    <main className="min-h-screen bg-black antialiased bg-grid-white/20 ">
      <HeroSection />
    </main>
  );
}