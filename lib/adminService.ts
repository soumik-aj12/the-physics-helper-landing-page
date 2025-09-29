import { adminDb } from "./firebaseAdmin";

export const getStudentDetailsById = async (studentId: string) => {
    const studentsRef = adminDb.collection("users").doc(studentId);
    const studentDoc = await studentsRef.get();
    if (!studentDoc.exists) {
        throw new Error("Student not found");
    }

    return studentDoc.data();
}

export const checkExistingExamApplication = async (studentId: string) => {
    const applicationsRef = adminDb.collection("applications").where("userId", "==", studentId);
    const snapshot = await applicationsRef.get();
    return !snapshot.empty;
}