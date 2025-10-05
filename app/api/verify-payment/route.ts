import { NextResponse } from "next/server"
import axios from "axios"
import { adminDb, adminStorage } from "@/lib/firebaseAdmin"
import { generateRollNumber, createAdmitCardPDF } from "@/lib/admitCardUtils"
import { verifyPaymentToken } from "@/lib/jwt"
import { checkExistingExamApplication, getStudentDetailsById } from "@/lib/adminService"

export async function POST(req: Request) {
  try {
    const { token } = await req.json()
    if (!token) return NextResponse.json({ status: "FAILED", error: "Missing token" }, { status: 400 })

      const payload: any = verifyPaymentToken(token)
      const { orderId, type, studentId, examId, examName, examLocation, classLevel, admissionData, amount } = payload
      
    const checkApplication = await checkExistingExamApplication(studentId);
    if (type === "exam" && checkApplication) {
      return NextResponse.json({ status: "FAILED", error: "Exam application already exists" })
    }
    const studentDoc = await getStudentDetailsById(studentId);
    const { name: studentName, email: studentEmail, phone: studentPhone } = studentDoc|| {};
    // log(studentName, studentEmail, studentPhone);
    // Verify with Cashfree
    const res = await axios.get(`${process.env.NEXT_PUBLIC_CASHFREE_URL}/${orderId}`, {
      headers: {
        "x-client-id": process.env.NEXT_PUBLIC_CASHFREE_APP_ID!,
        "x-client-secret": process.env.NEXT_PUBLIC_CASHFREE_SECRET_KEY!,
        "x-api-version": "2022-09-01",
      },
    })
    const paymentStatus = res.data?.order_status
    // console.log("Payment status:", paymentStatus);

    if (paymentStatus !== "PAID") {
      return NextResponse.json({ status: "FAILED", error: "Payment not completed" })
    }

    if (type === "exam") {
      // Generate Roll Number
      const rollNumber = generateRollNumber(examId)

      // Firestore doc ID unique per student & exam
      const docId = `${studentId}_${examId}`
      const applicationRef = adminDb.collection("applications").doc(docId)

      const examRef = adminDb.collection("exams").doc(examId)
      const examDoc = await examRef.get()

      var location = examLocation === "behala"? "Behala" : "Arambagh(Khanakul)";

      // Create PDF
      const pdfBuffer = await createAdmitCardPDF({
        studentName: studentName,
        studentEmail: studentEmail,
        studentPhone: studentPhone,
        rollNumber,
        examName,
        classLevel,
        examLocation: location,
        date: examDoc.exists ? (examDoc.data()?.date as string) : "TBD",
      });
      // console.log("Generated PDF size (bytes):", pdfBuffer.length);

      const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
      const fileRef = adminStorage
        .bucket(bucketName)
        .file(`admit_cards/${classLevel}/${rollNumber}.pdf`)

      await fileRef.save(pdfBuffer, {
        metadata: {
          contentType: 'application/pdf',
        },
      });
      await fileRef.makePublic();
      const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(
        `admit_cards/${classLevel}/${rollNumber}.pdf`
      )}?alt=media`

      await applicationRef.set({
        examId,
        userId: studentId,
        paymentId: orderId,
        amount,
        classLevel,
        downloadUrl,
        status: "paid",
        rollNumber,
        createdAt: new Date(),
      }, { merge: true })

      return NextResponse.json({ status: "SUCCESS", rollNumber, examId, classLevel })
    }
    else if (type === "admission") {
      // Update user data for admission
      const userRef = adminDb.collection("users").doc(studentId)
      await userRef.update({
        ...admissionData,
        admissionStatus: "Completed",
        paymentId: orderId,
        updatedAt: new Date(),
      })

      return NextResponse.json({ status: "SUCCESS", studentId })
    }

    return NextResponse.json({ status: "FAILED", error: "Invalid type" })
  } catch (err: any) {
    console.error("Verify payment error:", err.response?.data || err.message)
    return NextResponse.json({ status: "FAILED", error: err.response?.data || err.message }, { status: 500 })
  }
}

