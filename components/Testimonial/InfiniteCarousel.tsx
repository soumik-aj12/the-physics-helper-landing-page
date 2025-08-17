"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  content: string
  author: string
  title: string
}

const testimonials: Testimonial[] = [
  {
    content:
      "The Physics Helper has been instrumental in my journey to understanding the complexities of quantum mechanics. The faculty's expertise and the hands-on approach to learning have truly set me up for success in my physics career.",
    author: "Jane Doe",
    title: "PhD Candidate in Quantum Physics",
  },
  {
    content:
      "I never thought I'd grasp the intricacies of astrophysics, but thanks to The Physics Helper, I'm now confidently pursuing my dreams of becoming an astronomer.",
    author: "John Smith",
    title: "Undergraduate Student",
  },
  {
    content:
      "The research opportunities provided by The Physics Helper have been unparalleled. I've been able to contribute to cutting-edge experiments that I believe will shape the future of particle physics.",
    author: "Emily Chen",
    title: "Postdoctoral Researcher",
  },
]

export function InfiniteCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Wrap nextTestimonial in useCallback to prevent useEffect dependencies from changing
  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }, [])

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(nextTestimonial, 5000)
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovered, nextTestimonial])

  return (
    <div
      className="relative max-w-3xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <blockquote className="text-center m-10">
                <p className="text-xl text-gray-600 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                <footer className="text-gray-500">
                  - {testimonial.author}, {testimonial.title}
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevTestimonial}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-6 w-6 text-gray-600" />
      </button>
      <button
        onClick={nextTestimonial}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-6 w-6 text-gray-600" />
      </button>
    </div>
  )
}

