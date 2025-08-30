import React from 'react'
import GMaps from '@/components/GMaps'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, MapPin, Phone } from 'lucide-react'
import { ContactProps } from '@/lib/types'
const ContactComponent = ({ mapLat, mapLng, address }: ContactProps) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <GMaps mapLat={mapLat} mapLng={mapLng} />
            <div className="space-y-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                            <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                            <div>
                                <h3 className="font-semibold mb-1">Address</h3>
                                <p className="text-gray-600">
                                    {address}
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
            </div></div>
    )
}

export default ContactComponent