"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-context"
import { resendVerificationEmail } from "@/lib/auth"

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"

  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showResend, setShowResend] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendSuccess, setResendSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setShowResend(false)

    try {
      await login({ email, password })
      router.replace(redirect)
    } catch (err: any) {
      if (err.code === "auth/email-not-verified") {
        setError("Please verify your email before logging in.")
        setShowResend(true)
      } else if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password.")
      } else {
        setError(err.message || "Something went wrong.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResendLoading(true)
    setError(null)
    try {
      await resendVerificationEmail(email, password)
      setResendSuccess("Verification email resent. Please check your inbox.")
      setShowResend(false)
    } catch (err: any) {
      setError(err.message || "Failed to resend verification email.")
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {resendSuccess && <p className="text-sm text-green-600">{resendSuccess}</p>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>

      {showResend && (
        <Button variant="ghost" onClick={handleResend} disabled={resendLoading} className="mt-2 w-full">
          {resendLoading ? "Resending..." : "Resend verification email"}
        </Button>
      )}

      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <button className="text-blue-600 underline" onClick={() => router.push("/signup")}>
          Sign up
        </button>
      </p>
    </form>
  )
}
