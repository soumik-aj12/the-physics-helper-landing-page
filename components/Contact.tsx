import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-blue-600 text-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Start Your Physics Journey?</h2>
      <p className="text-xl mb-8">Join The Physics Helper today and unlock the mysteries of the universe.</p>
      <Button size="lg" variant="secondary">
        Contact Now
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </section>
  )
}

export default Contact