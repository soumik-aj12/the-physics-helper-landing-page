import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'


const About = () => {
  return (
    <section id="about" className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Physics Laboratory"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2 md:pl-12">
                <h2 className="text-3xl font-bold mb-4">About The Physics Helper</h2>
                <p className="text-gray-600 mb-6">
                  The Physics Helper is dedicated to advancing the understanding of physics through innovative education
                  and groundbreaking research. Our institution brings together brilliant minds, cutting-edge technology,
                  and a passion for discovery.
                </p>
                <Button variant="outline">Learn More About Us</Button>
              </div>
            </div>
          </div>
        </section>
  )
}

export default About