"use client";

import { RazorpayPayment } from "@/components/RazorPayment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Wrapper from "@/components/Wrapper/Wrapper";
import { CheckCircle, GraduationCap } from "lucide-react";
import React, { useState } from "react";
const admissionFees = {
  "11": 15000,
  "12": 18000,
}
const page = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    previousSchool: "",
    address: "",
    parentName: "",
    parentPhone: "",
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    setPaymentSuccess(true);
    setStep(3);
  };

  const handlePaymentError = (error: any) => {
    console.error("Payment failed:", error);
  };
  if (paymentSuccess) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow py-20">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl sfont-bold mb-4">
                  Admission Application Successful!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your admission application has been submitted successfully.
                  Our admissions team will contact you within 2-3 business days.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-sm">
                    <strong>Application ID:</strong> ADM
                    {Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </p>
                  <p className="text-sm">
                    <strong>Class:</strong> {formData.class}
                  </p>
                  <p className="text-sm">
                    <strong>Student Name:</strong> {formData.name}
                  </p>
                </div>
                <Button onClick={() => (window.location.href = "/")}>
                  Back to Home
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }
  return (
    <Wrapper>
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Admission</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Apply for admission to Class 11 or 12 at The Physics Helper.
          </p>
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
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Student Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Enter student's full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Student Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="class">Applying for Class</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("class", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="11">Class 11</SelectItem>
                        <SelectItem value="12">Class 12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="previousSchool">Previous School</Label>
                    <Input
                      id="previousSchool"
                      value={formData.previousSchool}
                      onChange={(e) =>
                        handleInputChange("previousSchool", e.target.value)
                      }
                      placeholder="Enter previous school name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      placeholder="Enter complete address"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="parentName">Parent/Guardian Name</Label>
                    <Input
                      id="parentName"
                      value={formData.parentName}
                      onChange={(e) =>
                        handleInputChange("parentName", e.target.value)
                      }
                      placeholder="Enter parent/guardian name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="parentPhone">Parent/Guardian Phone</Label>
                    <Input
                      id="parentPhone"
                      value={formData.parentPhone}
                      onChange={(e) =>
                        handleInputChange("parentPhone", e.target.value)
                      }
                      placeholder="Enter parent/guardian phone"
                    />
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
                      <span>Student Name:</span>
                      <span className="font-semibold">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Applying for:</span>
                      <span className="font-semibold">
                        Class {formData.class}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Parent/Guardian:</span>
                      <span className="font-semibold">
                        {formData.parentName}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <RazorpayPayment
                  amount={admissionFees[formData.class as keyof typeof admissionFees] || 15000}
                  description={`Admission Fee - Class ${formData.class}`}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default page;
