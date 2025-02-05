import About from "@/components/Announcements/About";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Programs from "@/components/Programs";
import Testimonial from "@/components/Testimonial/Testimonial";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features/>
        <About/>
        <Programs/>
        <Testimonial/>
        <Contact/>
      </main>
      <Footer/>
    </div>
  );
}
