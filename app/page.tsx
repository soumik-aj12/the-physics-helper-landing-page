"use client"

import Features from "@/components/Features";
import Wrapper from "@/components/Wrapper/Wrapper";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";
import Link from "next/link";
import { useAuth } from "@/components/auth-context";;
export default function Home() {
  const { user } = useAuth();

  return (
    <Wrapper>
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
        <div className="container mx-auto px-4 flex flex-col md:flex-row text-center items-center py-20">
          <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                “Time and space are not absolute — they are relative and connected in spacetime.”
              </h1>
              <p className="w-5/6 text-end text-xl md:text-lg mb-6">
                – Albert Einstein.
              </p>
            </div>
            <div className="grid grid-cols-1 justify-center align-middle gap-3 xl:w-fit">
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
                <>
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
                  <Link href="./Fees.pdf" target="_blank" rel="noopener noreferrer">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="w-full md:w-auto"
                    >
                      <div className="text-base">Download Fees Structure</div>
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </>
              )}
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full md:w-auto"
                >
                  <div className="text-base">Contact us</div>
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
