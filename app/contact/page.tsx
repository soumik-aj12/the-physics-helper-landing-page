import ContactComponent from '@/components/ContactComponent'
import Wrapper from '@/components/Wrapper/Wrapper'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { arambaghContact, behalaContact } from '@/lib/data'
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
                        <Tabs defaultValue="behala">
                            <TabsList>
                                <TabsTrigger value="behala">Behala</TabsTrigger>
                                <TabsTrigger value="arambagh">Arambagh</TabsTrigger>
                            </TabsList>
                            <TabsContent value="behala"><ContactComponent mapLat={behalaContact.mapLat} mapLng={behalaContact.mapLng} address={behalaContact.address} /></TabsContent>
                            <TabsContent value="arambagh"><ContactComponent mapLat={arambaghContact.mapLat} mapLng={arambaghContact.mapLng} address={arambaghContact.address} /></TabsContent>
                        </Tabs>
                    </div>
                </section>
            </div>
        </Wrapper>
    )
}

export default page