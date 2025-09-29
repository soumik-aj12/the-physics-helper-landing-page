import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"

export async function POST(req: Request) {
  const event = await req.json()

  if (event.type === "PAYMENT_SUCCESS_WEBHOOK") {
    const { order_id, order_amount, customer_details } = event.data

    // ✅ Add student to exam table in Firebase
    await addDoc(collection(db, "exams"), {
      studentId: customer_details.customer_id,
      examId: order_id,
      amount: order_amount,
      status: "paid",
      createdAt: new Date(),
    })
  }

  return NextResponse.json({ status: "ok" })
}
