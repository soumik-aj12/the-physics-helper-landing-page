import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Unlock the Secrets of the Universe</h1>
              <p className="text-xl mb-6">
                Join The Physics Helper and embark on a journey of discovery and innovation.
              </p>
              <Button size="lg" variant="secondary">
                Explore Our Programs
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="md:w-1/2">
              <Image
                src="https://placehold.co/600x400"
                alt="Physics Concept Illustration"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
  )
}

export default Hero