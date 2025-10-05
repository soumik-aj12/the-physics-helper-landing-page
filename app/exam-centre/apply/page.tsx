"use client"
import { useState, useMemo, useEffect } from "react"
import { useAuth } from "@/components/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { load } from "@cashfreepayments/cashfree-js"
import Wrapper from "@/components/Wrapper/Wrapper"
import { getExams } from "@/lib/service"
import { Breadcrumber } from "@/components/BreadCrumber"
import Link from "next/link"

export default function ExamApplication() {
  const { user } = useAuth()
  useMemo(() => `/auth?redirect=${encodeURIComponent("/exam-centre/apply")}`, [])

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    class: user?.classLevel || "",
    examId: "",
    examName: "",
    examLocation: ""
  })

  const examFees = process.env.NEXT_PUBLIC_PAYMENT_AMOUNT;

  const handleInputChange = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }))
  const handleNext = () => setStep(2)

  const handleCashfreePayment = async () => {
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examId: formData.examId,
          examName: formData.examName,
          amount: examFees,
          studentId: user!.uid,
          studentName: formData.name,
          studentEmail: formData.email,
          classLevel: formData.class,
          email: formData.email,
          phone: formData.phone,
          type: "exam"
        }),
      })
      const data = await res.json()
      if (!data.payment_session_id) throw new Error("No payment session returned")

      const cashfree = await load({ mode: process.env.NEXT_PUBLIC_CASHFREE_MODE! })
      cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_self",
      })
    } catch (err) {
      console.error(err)
      alert("Payment initialization failed")
    }
  }
  const [examData, setExamData] = useState<any>(null);
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const data = await getExams(null);
        // console.log(data);

        setExamData(data.filter((exam: any) => exam.classLevel === formData.class));
      } catch (err) {
        console.error(err);
      }
    }
    fetchExamData();
  }, [])
  if(!user){
    return <Wrapper>
      <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
        <p className="mb-4">You need to be logged in to apply for an exam.</p>
      </div>
    </Wrapper>
  }
  if (step === 1) {
    return (
      <Wrapper>
        <div className="container mx-auto px-4 py-20 max-w-2xl">
          <Breadcrumber
            start="Exam Centre"
            end="Apply for Exam"
            startLink="/exam-centre"
            endLink="/apply"
            dropdownItems={[{ label: "View Results", link: "results" }, { label: "View Syllabus", link: "syllabus" }, { label: "Downloads", link: "downloads" }]}
          />
          <Card>
            <CardHeader><CardTitle>Student Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Label>Full Name</Label>
              <Input value={formData.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("name", e.target.value)} />
              <Label>Email</Label>
              <Input type="email" value={formData.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("email", e.target.value)} />
              <Label>Class</Label>
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
              <Label>Exam Location</Label>
              <Select value={formData.examLocation} onValueChange={(v: string) => handleInputChange("examLocation", v)}>
                <SelectTrigger><SelectValue placeholder="Select exam location" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="behala">Behala</SelectItem>
                  <SelectItem value="arambagh">Arambagh(Khanakul)</SelectItem>
                </SelectContent>
              </Select>
              <Label>Exam</Label>
              <Select value={formData.examId} onValueChange={(v: string) => {
                handleInputChange("examId", v);
                handleInputChange("examName", examData?.find((exam: any) => exam.id === v)?.name || "");
              }}>
                <SelectTrigger><SelectValue placeholder="Select exam" /></SelectTrigger>
                <SelectContent>
                  {examData ? examData?.map((exam: any) => (
                    <SelectItem key={exam.id} value={exam.id}>
                      {exam.name}
                    </SelectItem>
                  )) : (
                    <SelectItem value="loading">No exams available</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <Button className="w-full mt-4" onClick={handleNext}>Proceed to Payment</Button>
            </CardContent>
          </Card>
        </div>
      </Wrapper>
    )
  }

  if (step === 2) {
    return (
      <Wrapper>
        <div className="container mx-auto px-4 py-20 max-w-2xl">
          <Card>
            <CardHeader><CardTitle>Application Summary</CardTitle></CardHeader>
            <CardContent>
              <p>Name: {formData.name}</p>
              <p>Class: {formData.class}</p>
              <p>Exam: {formData.examName}</p>
              <p>Exam Location: {formData.examLocation === "behala" ? "Behala" : formData.examLocation === "arambagh" ? "Arambagh(Khanakul)" : ""}</p>
              <Button className="w-full mt-4" onClick={handleCashfreePayment}>
                Pay ₹{examFees} & Apply
              </Button>
              <p className="text-sm text-center text-gray-600">Please be patient while processing payment. Do not refresh or close the window</p>
            </CardContent>
          </Card>
        </div>
      </Wrapper>
    )
  }

  return null
}
