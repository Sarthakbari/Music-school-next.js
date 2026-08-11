import Featured from "@/components/Featured";
import HeroSection from "@/components/HeroSection";
import MusicSchoolTestimonialCard from "@/components/TestimonialCards";
import TestimonialCards from "@/components/TestimonialCards";
import UpcomingWebinars from "@/components/UpcomingWebinars";
import WhyChooseUs from "@/components/WhyChooseUs";
import { main } from "framer-motion/client";

export default function Home() {
  return (
    <main className=" sticky-scrollbar min-h-screen bg-black/96 antialiased bg-grid-white/[0.02]">
      <HeroSection />
      <Featured />
      <WhyChooseUs />
      <MusicSchoolTestimonialCard />
      <UpcomingWebinars />
    </main>
  );
}