import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export async function registerUser(
  name: string,
  email: string,
  password: string,
  classLevel?: "11" | "12"
) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(cred.user, { displayName: name });

  await setDoc(doc(db, "users", cred.user.uid), {
    name,
    email,
    classLevel,
    createdAt: new Date(),
    emailVerified: cred.user.emailVerified || false,
  });

  await sendEmailVerification(cred.user);

  await signOut(auth);

  return cred.user;
}

export async function loginUser(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);

  if (!cred.user.emailVerified) {
    await signOut(auth);
    const err: any = new Error("Please verify your email before logging in.");
    err.code = "auth/email-not-verified";
    throw err;
  }

  return cred.user;
}

export async function resendVerificationEmail(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);

  if (cred.user.emailVerified) {
    await signOut(auth);
    const err: any = new Error("Email is already verified.");
    err.code = "auth/email-already-verified";
    throw err;
  }

  await sendEmailVerification(cred.user);
  await signOut(auth);
  return;
}

export async function logoutUser() {
  return signOut(auth);
}
