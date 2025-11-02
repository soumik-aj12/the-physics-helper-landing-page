import { NextResponse } from "next/server"
import axios from "axios"
import { generatePaymentToken } from "@/lib/jwt"
import { getStudentDetailsById } from "@/lib/adminService"

export async function POST(req: Request) {
  const { type, studentId, examName, examId, studentEmail, classLevel, examLocation, admissionData, amount } = await req.json()

  // log("Creating order for:", { type, studentId, examName, examId, studentName, studentEmail, classLevel, admissionData, amount  });
  if (!type || !studentId || !amount) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  }
  var token = null;
  const orderId = `${type}_${Date.now()}`
  const getStudentDetails = await getStudentDetailsById(studentId);
  const {phone: studentPhone} = getStudentDetails || {};
  if(type === "exam"){
      token = generatePaymentToken({ orderId, type, studentId, examId, classLevel, examLocation, examName })
  }else{
      token = generatePaymentToken({ orderId, type, studentId, admissionData })
  }
  
  const res = await axios.post(
    process.env.NEXT_PUBLIC_CASHFREE_URL!,
    {
      order_amount: type === "exam" ? parseFloat(process.env.NEXT_PUBLIC_EXAM_FEES!) : parseFloat(process.env.NEXT_PUBLIC_ADMISSION_FEES!),
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: studentId,
        customer_email: studentEmail,
        customer_phone: studentPhone,
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
