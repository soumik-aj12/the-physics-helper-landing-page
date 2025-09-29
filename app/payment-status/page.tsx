"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Wrapper from "@/components/Wrapper/Wrapper"

export default function PaymentStatus() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading")
  const [classLevel, setClassLevel] = useState<string | null>(null)
  const [rollNumber, setRollNumber] = useState<string | null>(null)
  const [examId, setExamId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (!token) {
      setStatus("failed")
      return
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })
        const data = await res.json()
        // console.log("Payment verification response:", data);

        if (data.status === "SUCCESS") {
          setStatus("success")
          if (data.rollNumber) setRollNumber(data.rollNumber)
          if (data.examId) setExamId(data.examId)
          if (data.classLevel) setClassLevel(data.classLevel)
        } else {
          setStatus("failed")
          setError(data.error || "Payment verification failed")
        }
      } catch (err) {
        console.error(err)
        setStatus("failed")
      }
    }

    verifyPayment()
  }, [token])
  const downloadAdmitCard = () => {
    if (!rollNumber) return
    // URL to Firebase Storage file
    const filePath = `admit_cards/${classLevel}/${rollNumber}.pdf`
    const url = `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(filePath)}?alt=media`
    window.open(url, "_blank")
  }

  return (
    <Wrapper>
      <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
        {status === "loading" && <p>Verifying your payment, please wait...</p>}

        {status === "success" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <CheckCircle className="text-green-600 h-8 w-8" /> Payment Successful
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Your payment has been successfully processed.</p>
              {rollNumber && (
                <>
                  <p className="mb-2"><strong>Roll Number:</strong> {rollNumber}</p>
                  <Button onClick={downloadAdmitCard}>Download Admit Card</Button>
                </>
              )}
              <div className="mt-4">
                <Button onClick={() => router.push("/")}>Back to Home</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {status === "failed" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <XCircle className="text-red-600 h-8 w-8" /> Error
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{error || "There was an issue verifying your payment."}</p>
              <Button onClick={() => router.push("/")}>Back to Home</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Wrapper>
  )
}
