"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

type User = {
  name: string
  email: string
  classLevel?: "11" | "12"
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (data: { email: string; password: string }) => Promise<void>
  signup: (data: { name: string; email: string; password: string; classLevel?: "11" | "12" }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const LS_KEY = "ph_user"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as User
        setUser(parsed)
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async ({ email }: { email: string; password: string }) => {
    // Demo login: accept any email/password
    const u: User = {
      name: email.split("@")[0] || "Student",
      email,
    }
    localStorage.setItem(LS_KEY, JSON.stringify(u))
    setUser(u)
  }

  const signup = async ({
    name,
    email,
    classLevel,
  }: { name: string; email: string; password: string; classLevel?: "11" | "12" }) => {
    const u: User = { name: name || email.split("@")[0] || "Student", email, classLevel }
    localStorage.setItem(LS_KEY, JSON.stringify(u))
    setUser(u)
  }

  const logout = () => {
    localStorage.removeItem(LS_KEY)
    setUser(null)
  }

  const value = useMemo(() => ({ user, isLoading, login, signup, logout }), [user, isLoading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
