import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { HeroCarousel } from "./HeroCarousel";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mechanics is the heart of Physics
            </h1>
            <p className="w-5/6 text-end text-xl md:text-lg mb-6">– Arghya Sen.</p>
          </div>
          <Button size="lg" variant="secondary">
            <div className="text-base">Contact me</div>
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="w-full md:w-1/2">
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
};

export default Hero;
