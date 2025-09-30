import { NextResponse } from "next/server"
import axios from "axios"
import { generatePaymentToken } from "@/lib/jwt"
import { log } from "console"
import { getStudentDetailsById } from "@/lib/adminService"

export async function POST(req: Request) {
  const { type, studentId, examName, examId, studentEmail, classLevel, admissionData, amount } = await req.json()

  // log("Creating order for:", { type, studentId, examName, examId, studentName, studentEmail, classLevel, admissionData, amount  });
  if (!type || !studentId || !amount) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  }

  const orderId = `${type}_${Date.now()}`
  const getStudentDetails = await getStudentDetailsById(studentId);
  const {phone: studentPhone} = getStudentDetails || {};
  const token = generatePaymentToken({ orderId, type, studentId, examId, classLevel, examName, admissionData, amount })
  const res = await axios.post(
    "https://sandbox.cashfree.com/pg/orders",
    {
      order_amount: amount,
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: studentId,
        customer_email: admissionData?.email || studentEmail,
        customer_phone: admissionData?.phone || studentPhone,
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-status?token=${token}`,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-client-id": process.env.NEXT_PUBLIC_CASHFREE_APP_ID!,
        "x-client-secret": process.env.NEXT_PUBLIC_CASHFREE_SECRET_KEY!,
        "x-api-version": "2022-09-01",
      },
    }
  )
  
  return NextResponse.json({ ...res.data, token })
}
