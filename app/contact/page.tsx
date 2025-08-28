import GMaps from '@/components/GMaps'
import { Card, CardContent } from '@/components/ui/card'
import Wrapper from '@/components/Wrapper/Wrapper'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

const page = () => {
    return (
        <Wrapper>
            <div id="locate">
                <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                        <p className="text-xl max-w-3xl mx-auto">
                            Get in touch with us to learn more about our programs or to start your physics journey.
                        </p>
                    </div>
                </section>
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-3xl font-bold mb-4">Ready to Start Your Physics Journey?</h2>
                                <p className="text-xl mb-8">Join The Physics Helper today and unlock the mysteries of the universe.</p>
                                <GMaps />
                            </div>
                            <div className="space-y-6">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-start space-x-4">
                                            <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                                            <div>
                                                <h3 className="font-semibold mb-1">Address</h3>
                                                <p className="text-gray-600">

                                                    263/1, Dr Akshay Kumar Paul Rd
                                                    near Sitalatala Sanghashree Club, Behala Chowrasta, Purbasa Pally, Behala
                                                    Kolkata, West Bengal 700034
                                                    India

                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-start space-x-4">
                                            <Phone className="h-6 w-6 text-blue-600 mt-1" />
                                            <div>
                                                <h3 className="font-semibold mb-1">Phone</h3>
                                                <p className="text-gray-600">+1 (555) 123-4567</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-start space-x-4">
                                            <Mail className="h-6 w-6 text-blue-600 mt-1" />
                                            <div>
                                                <h3 className="font-semibold mb-1">Email</h3>
                                                <p className="text-gray-600">info@physicshelper.com</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Wrapper>
    )
}

export default page