import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Book, Lightbulb, Users } from 'lucide-react'

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose The Physics Helper?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Book,
                  title: "Expert-Led Courses",
                  description: "From JEE Mains to NEET.",
                },
                {
                  icon: Users,
                  title: "Practical Classes",
                  description: "All kinds of practical instruments are present.",
                },
                {
                  icon: Lightbulb,
                  title: "Monthly & Weekly Exams",
                  description: "Exams every 2 weeks and a brushup exam every month.",
                },
              ].map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
  )
}

export default Features