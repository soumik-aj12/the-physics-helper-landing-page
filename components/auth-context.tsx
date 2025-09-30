"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { loginUser, registerUser, logoutUser } from "@/lib/auth";
import { doc, getDoc } from "firebase/firestore";

type User = { uid: string; name: string; email: string; classLevel?: "11" | "12"; admissionStatus?: "Pending" | "Completed" | "" } | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  signup: (data: { name: string; email: string; password: string; classLevel?: "11" | "12", phone: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && firebaseUser.emailVerified) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          const u: User = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Student",
            email: firebaseUser.email || "",
            admissionStatus: userData.admissionStatus || "Pending",
            classLevel: userData.classLevel,
          };
          setUser(u);
        }

      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  const login = async ({ email, password }: { email: string; password: string }) => {
    await loginUser(email, password);
  };

  const signup = async ({ name, email, password, classLevel, phone }: { name: string; email: string; password: string; classLevel?: "11" | "12", phone: string }) => {
    await registerUser(name, email, phone, password, classLevel);
  };

  const logout = async () => {
    await logoutUser();
  };

  const value = useMemo(() => ({ user, isLoading, login, signup, logout }), [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
