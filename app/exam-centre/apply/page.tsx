"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RazorpayPayment } from "@/components/RazorPayment"
import { CheckCircle } from "lucide-react"
import Wrapper from "@/components/Wrapper/Wrapper"

export default function page() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        class: "",
        exam: "",
        rollNumber: "",
    })
    const [paymentSuccess, setPaymentSuccess] = useState(false)

    const examFees = {
        "physics-midterm-11": 500,
        "physics-final-12": 750,
        "physics-olympiad": 1000,
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleNext = () => {
        setStep(step + 1)
    }

    const handlePaymentSuccess = (paymentId: string) => {
        setPaymentSuccess(true)
        setStep(3)
    }

    const handlePaymentError = (error: any) => {
        console.error("Payment failed:", error)
    }

    if (paymentSuccess) {
        return (
            <Wrapper>
                <div className="container mx-auto px-4 max-w-2xl">
                    <Card>
                        <CardContent className="p-8 text-center">
                            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold mb-4">Application Successful!</h2>
                            <p className="text-gray-600 mb-6">
                                Your exam application has been submitted successfully. You will receive a confirmation email shortly.
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                <p className="text-sm">
                                    <strong>Application ID:</strong> APP{Math.random().toString(36).substr(2, 9).toUpperCase()}
                                </p>
                                <p className="text-sm">
                                    <strong>Exam:</strong> {formData.exam}
                                </p>
                                <p className="text-sm">
                                    <strong>Class:</strong> {formData.class}
                                </p>
                            </div>
                            <Button onClick={() => (window.location.href = "/exam-centre")}>Back to Exam Centre</Button>
                        </CardContent>
                    </Card>
                </div>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <div className=" py-20 container mx-auto px-4 max-w-2xl">
                <h1 className="text-3xl font-bold text-center mb-8">Exam Application</h1>

                {step === 1 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Student Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="class">Class</Label>
                                    <Select onValueChange={(value) => handleInputChange("class", value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your class" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="11">Class 11</SelectItem>
                                            <SelectItem value="12">Class 12</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="exam">Select Exam</Label>
                                    <Select onValueChange={(value) => handleInputChange("exam", value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select exam" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="physics-midterm-11">Physics Mid-Term (Class 11)</SelectItem>
                                            <SelectItem value="physics-final-12">Physics Final (Class 12)</SelectItem>
                                            <SelectItem value="physics-olympiad">Physics Olympiad</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button onClick={handleNext} className="w-full">
                                    Proceed to Payment
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Application Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Name:</span>
                                        <span className="font-semibold">{formData.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Class:</span>
                                        <span className="font-semibold">{formData.class}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Exam:</span>
                                        <span className="font-semibold">{formData.exam}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <RazorpayPayment
                            amount={examFees[formData.exam as keyof typeof examFees] || 500}
                            description={`Exam Fee - ${formData.exam}`}
                            onSuccess={handlePaymentSuccess}
                            onError={handlePaymentError}
                        />
                    </div>
                )}
            </div>
        </Wrapper>
    )
}
