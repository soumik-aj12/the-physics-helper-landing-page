"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard } from "lucide-react"

interface RazorpayPaymentProps {
  amount: number
  description: string
  onSuccess: (paymentId: string) => void
  onError: (error: any) => void
}

export function RazorpayPayment({ amount, description, onSuccess, onError }: RazorpayPaymentProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    setIsLoading(true)

    try {
      // In a real application, you would integrate with Razorpay SDK
      // For demo purposes, we'll simulate a payment
      setTimeout(() => {
        const mockPaymentId = `pay_${Math.random().toString(36).substr(2, 9)}`
        onSuccess(mockPaymentId)
        setIsLoading(false)
      }, 2000)
    } catch (error) {
      onError(error)
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          Payment Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Description:</span>
            <span className="font-semibold">{description}</span>
          </div>
          <div className="flex justify-between">
            <span>Amount:</span>
            <span className="font-semibold">₹{amount}</span>
          </div>
          <Button onClick={handlePayment} disabled={isLoading} className="w-full">
            {isLoading ? "Processing..." : `Pay ₹${amount}`}
          </Button>
          <p className="text-xs text-gray-500 text-center">Secure payment powered by Razorpay</p>
        </div>
      </CardContent>
    </Card>
  )
}
