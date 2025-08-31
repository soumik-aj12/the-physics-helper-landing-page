// lib/auth.ts
import { auth, db } from "./firebase"
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile 
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

export async function registerUser(
  name: string, 
  email: string, 
  password: string, 
  classLevel?: "11" | "12"
) {
  const cred = await createUserWithEmailAndPassword(auth, email, password)

  // Set displayName inside Firebase Auth
  await updateProfile(cred.user, { displayName: name })

  // Save extended profile in Firestore
  await setDoc(doc(db, "users", cred.user.uid), {
    name,
    email,
    classLevel,
    createdAt: new Date(),
  })

  return cred.user
}

export async function loginUser(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password)
  return cred.user
}

export async function logoutUser() {
  return signOut(auth)
}
