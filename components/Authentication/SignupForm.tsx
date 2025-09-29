"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/auth-context"

export default function SignupForm() {
  const router = useRouter()
  const { signup } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [classLevel, setClassLevel] = useState<"11" | "12" | undefined>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (!classLevel) throw new Error("Please select your class level")
      if (password.length < 6) throw new Error("Password must be at least 6 characters")

      await signup({ name, email, password, classLevel, phone })
      router.replace("/login?msg=verify")
    } catch (err: any) {
      setError(err.code === "auth/email-already-in-use" ? "This email is already registered." : err.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name">Full name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="class">Class</Label>
        <Select value={classLevel} onValueChange={(v) => setClassLevel(v as "11" | "12")}>
          <SelectTrigger>
            <SelectValue placeholder="Select Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="11">Class 11</SelectItem>
            <SelectItem value="12">Class 12</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Sign up"}
      </Button>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <button className="text-blue-600 underline" onClick={() => router.push("/login")}>
          Log in
        </button>
      </p>
    </form>
  )
}
