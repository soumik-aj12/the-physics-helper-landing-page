"use client"

import { useAuth } from "@/components/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Wrapper from "@/components/Wrapper/Wrapper"
import { CheckCircle, GraduationCap } from "lucide-react"
import React, { useState } from "react"
import { load } from "@cashfreepayments/cashfree-js"


export default function Admission() {
  const { user } = useAuth();

  const [step, setStep] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    class: user?.classLevel || "",
    classType: user?.classType || "",
    admissionLocation: "",
    school: "",
    parentName: "",
    parentPhone: "",
  })
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (!formData.school || !formData.parentName || !formData.parentPhone) {
      setError("Please fill all the fields");
      return;
    }
    setStep(step + 1);
  }

  // 🔑 Trigger Cashfree Payment
  const startPayment = async () => {
    try { 
      // 1️⃣ Create order
      const finalData = {
        school: formData.school,
        parentName: formData.parentName,
        parentPhone: formData.parentPhone,
        admissionLocation: formData.admissionLocation,
        classType: formData.classType
      }
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "admission",
          studentId: user?.uid,
          admissionData: finalData,
          amount: process.env.NEXT_PUBLIC_ADMISSION_FEES!,
        }),
      })
      const data = await res.json()
      if (!data.payment_session_id) throw new Error("No payment session returned")
      const cashfree = await load({ mode: process.env.NEXT_PUBLIC_CASHFREE_MODE! }) // "TEST" | "PROD"
      cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_self",
      })
    } catch (err) {
      console.error("Payment init error:", err)
    }
  }

  if (paymentSuccess) {
    return (
      <Wrapper>
        <div className="container mx-auto px-4 max-w-2xl py-20">
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Admission Application Successful!</h2>
              {/* <p className="text-gray-600 mb-6">Our admissions team will contact you shortly.</p> */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm">
                  <strong>Class:</strong> {formData.class}
                </p>
                <p className="text-sm">
                  <strong>Student Name:</strong> {formData.name}
                </p>
              </div>
              <Button onClick={() => (window.location.href = "/")}>Back to Home</Button>
            </CardContent>
          </Card>
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Admission</h1>
          <p className="text-xl max-w-3xl mx-auto">Apply for admission to Class 10, 11 or 12 at The Physics Helper.</p>
        </div>
      </section>

      <div className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex items-center justify-center mb-8">
            <GraduationCap className="h-8 w-8 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold">Admission Application</h2>
          </div>

          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Student Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleNext()
                  }}
                >
                  <div>
                    <Label htmlFor="name">Student Full Name</Label>
                    <Input id="name" value={formData.name} disabled={true} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={user?.email} disabled />
                  </div>
                  <div>
                    <Label htmlFor="phone">Student Mobile Number</Label>
                    <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} disabled={!!user?.phone}/>
                  </div>
                  <div>
                    <Label htmlFor="class">Applying for Class</Label>
                    <Select value={formData.class} onValueChange={(value) => handleInputChange("class", value)} disabled={!!user?.classLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">Class 10</SelectItem>
                        <SelectItem value="11">Class 11</SelectItem>
                        <SelectItem value="12">Class 12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="class">Classtype</Label>
                    <Select value={formData.classType} onValueChange={(value) => handleInputChange("classType", value)} disabled={!!user?.classType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JEE">JEE</SelectItem>
                        <SelectItem value="NEET">NEET</SelectItem>
                        <SelectItem value="Both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Admission Location</Label>
                    <Select value={formData.admissionLocation} onValueChange={(value) => handleInputChange("admissionLocation", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="behala">Behala (Kolkata) Centre</SelectItem>
                        <SelectItem value="khanakul">Khanakul (Arambagh) Centre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="school">School</Label>
                    <Input id="school" value={formData.school} onChange={(e) => handleInputChange("school", e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="parentName">Parent/Guardian Name</Label>
                    <Input id="parentName" value={formData.parentName} onChange={(e) => handleInputChange("parentName", e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="parentPhone">Parent/Guardian Mobile Number</Label>
                    <Input id="parentPhone" type="tel" value={formData.parentPhone} onChange={(e) => handleInputChange("parentPhone", e.target.value)} />
                  </div>
                  <Button type="submit" className="w-full">
                    Proceed to Payment
                  </Button>
                </form>
                {error && <p className="text-sm text-red-600 text-center mt-2">{error}</p>}
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
                      <span>Student Name:</span>
                      <span className="font-semibold">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Applying for:</span>
                      <span className="font-semibold">Class {formData.class}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Class Type:</span>
                      <span className="font-semibold">{formData.classType === "Both" ? formData.classType + " (JEE+NEET)" : formData.classType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Admission Location:</span>
                      <span className="font-semibold">{formData.admissionLocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Parent/Guardian:</span>
                      <span className="font-semibold">{formData.parentName}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={startPayment} className="w-full">
                Pay Admission Fee
              </Button>
              <Button variant="ghost" onClick={() => setStep(1)} className="w-full">
                Back
              </Button>
              <p className="text-sm text-center text-gray-600">Please be patient while processing payment. Do not refresh or close the window</p>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  )
}
