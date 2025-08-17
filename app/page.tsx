import About from "@/components/Announcements/About";
import Contact from "@/components/Location/Location";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero/Hero";
import Testimonial from "@/components/Testimonial/Testimonial";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features/>
        <About/>
        <Testimonial/>
        <Contact/>
      </main>
      <Footer/>
    </div>
  );
}
