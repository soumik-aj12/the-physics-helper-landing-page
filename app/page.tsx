"use client"

import Features from "@/components/Features";
import Wrapper from "@/components/Wrapper/Wrapper";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";
import Link from "next/link";
import { useAuth } from "@/components/auth-context";

export default function Home() {
  const { user } = useAuth();
  
  return (
    <Wrapper>
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
        <div className="container mx-auto px-4 flex flex-col md:flex-row text-center items-center py-20">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Mechanics is the heart of Physics
              </h1>
              <p className="w-5/6 text-end text-xl md:text-lg mb-6">
                – Arghya Sen.
              </p>
            </div>
            <div className="flex flex-col justify-center 2xl:flex-row gap-3">
              {user && user.admissionStatus !== "Completed" && (
                <Link href="/admission">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full md:w-auto"
                  >
                    <div className="text-base">Apply for admission</div>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
              {user && (
                <Link href="/exam-centre/apply">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full md:w-auto"
                  >
                    <div className="text-base">Apply for exam</div>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full md:w-auto"
                >
                  <div className="text-base">Contact me</div>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <HeroCarousel />
          </div>
        </div>
        <Features />
        {/* <Testimonial /> */}
      </section>
    </Wrapper>
  );
}
