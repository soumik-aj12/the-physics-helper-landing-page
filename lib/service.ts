import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const getExams = async (classLevel: string | null) => {
    console.log("classLevel in getExams:", classLevel);
    
    const examsRef = collection(db, "exams");
    var querySnapshot;
    if (classLevel) {
        const q = query(examsRef, where("classLevel", "==", classLevel));
        querySnapshot = await getDocs(q);
    } else {
        querySnapshot = await getDocs(examsRef);
    }
    const exams = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return { id: doc.id, classLevel: data.classLevel, ...data };
    });
    return exams;
}

export const checkExistingExamApplication = async (studentId: string) => {
    const applicationsRef = collection(db, "applications");
    const q = query(applicationsRef, where("userId", "==", studentId));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
}

export const getAdmitCardURL = async (studentId: string) => {
    const applicationsRef = collection(db, "applications");
    const q = query(applicationsRef, where("userId", "==", studentId));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const data = snapshot.docs[0].data();
    return data.downloadUrl;
}