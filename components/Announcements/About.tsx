import React from "react";
import { QuizSection } from "./Quiz";
import { OrbitingCirclesDemo } from "./Orbit";

const About = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center">
          Stay Informed and Test Your Knowledge
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="w-full md:w-1/2 flex justify-center h-[60%]">
            <OrbitingCirclesDemo/>
          </div>
          <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
            <p className="text-[#141414] text-lg font-bold leading-tight tracking-[-0.015em]">
              Test your physics knowledge with our fun quiz!
            </p>
            <div className="flex items-end gap-3 justify-between">
              <p className="text-neutral-500 text-base font-normal leading-normal">
                Answer 10 questions and get instant feedback on your score and
                the correct answers.
              </p>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#39E079] text-[#141414] text-sm font-medium leading-normal">
                <span className="truncate">Take the Quiz</span>
              </button>
            </div>
            <div className="mt-3 text-neutral-500 text-base font-normal leading-normal">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur doloremque est nisi quidem fugit facilis repudiandae. Officia necessitatibus fugit nesciunt eligendi eveniet, mollitia facilis consequatur impedit obcaecati fuga minus dolorem?
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
