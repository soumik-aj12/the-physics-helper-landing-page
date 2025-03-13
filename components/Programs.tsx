import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Programs = () => {
  return (
    <section id="programs" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center">Our Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "Quantum Mechanics",
            "Astrophysics",
            "Particle Physics",
            "Thermodynamics",
            "Electromagnetism",
            "Nuclear Physics",
          ].map((program, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{program}</h3>
                <p className="text-gray-600 mb-4">
                  Dive deep into the fascinating world of{" "}
                  {program.toLowerCase()} with our comprehensive program.
                </p>
                <Button variant="link" className="p-0">
                  Learn More <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
