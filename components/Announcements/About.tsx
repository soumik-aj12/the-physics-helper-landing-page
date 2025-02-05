import React from 'react'
import { QuizSection } from './Quiz'


const About = () => {
  return (
    <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Stay Informed and Test Your Knowledge</h2>
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8">
              <div className="w-full md:w-1/2 flex justify-center">
              </div>
              <div className="w-full md:w-1/2">
                <QuizSection />
              </div>
            </div>
          </div>
        </section>
  )
}

export default About