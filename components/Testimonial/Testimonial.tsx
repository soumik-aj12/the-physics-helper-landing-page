import React from "react";
import { InfiniteCarousel } from "./InfiniteCarousel";

const Testimonial = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Students Say
        </h2>
        <InfiniteCarousel/>
      </div>
    </section>
  );
};

export default Testimonial;

