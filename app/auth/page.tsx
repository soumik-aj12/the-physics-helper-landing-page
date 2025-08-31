"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/auth-context"
import Wrapper from "@/components/Wrapper/Wrapper"
import { registerUser } from "@/lib/auth"

export default function AuthPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirect = searchParams.get("redirect") || "/"
    const [mode, setMode] = useState<"login" | "signup">("login")
    const { user, login, signup, isLoading } = useAuth()
    useEffect(() => {
        if (!isLoading && user) {
            router.replace(redirect)
        }
    }, [user, isLoading, router, redirect])

    return (
        <Wrapper>
            <div className="container mx-auto px-4 max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            {mode === "login" ? "Login" : "Create an account"}
                            <div className="text-sm">
                                {mode === "login" ? (
                                    <span>
                                        New here?{" "}
                                        <button className="text-blue-600 underline" onClick={() => setMode("signup")}>
                                            Sign up
                                        </button>
                                    </span>
                                ) : (
                                    <span>
                                        Already have an account?{" "}
                                        <button className="text-blue-600 underline" onClick={() => setMode("login")}>
                                            Log in
                                        </button>
                                    </span>
                                )}
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {mode === "login" ? (
                            <LoginForm onLogin={login} />
                        ) : (
                            <SignupForm onSignup={signup} />
                        )}
                    </CardContent>
                </Card>
            </div>
        </Wrapper>
    )
}

function LoginForm({
  onLogin,
}: {
  onLogin: (data: { email: string; password: string }) => Promise<void>
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await onLogin({ email, password })
      // redirect handled by AuthPage effect once user is set
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string }
      setError(
        error.code === "auth/invalid-credential"
          ? "Invalid email or password."
          : error.message || "An error occurred."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  )
}


function SignupForm({
  onSignup,
}: {
  onSignup: (data: { name: string; email: string; password: string; classLevel?: "11" | "12" }) => Promise<void>
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [classLevel, setClassLevel] = useState<"11" | "12" | undefined>(undefined)
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (!classLevel) {
        throw new Error("Please select your class level")
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters")
      }

      await onSignup({ name, email, password, classLevel })
      // redirect handled by AuthPage effect once user is set
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string }
      setError(
        error.code === "auth/email-already-in-use"
          ? "This email is already registered."
          : error.message || "An error occurred."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name">Full name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Jane Doe"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
        />
      </div>
      <div>
        <Label htmlFor="class">Class</Label>
        <Select
          value={classLevel}
          onValueChange={(v) => setClassLevel(v as "11" | "12")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Class 11 or 12" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="11">Class 11</SelectItem>
            <SelectItem value="12">Class 12</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Create a password"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Sign up"}
      </Button>
    </form>
  )
}
