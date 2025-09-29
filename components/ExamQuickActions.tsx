"use client"

import Link from "next/link"
import { useAuth } from "@/components/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, Download, Trophy, Lock } from "lucide-react"

export function ExamQuickActions() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="h-20 bg-gray-100 animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const loginRedirectApply = "/login?redirect=/exam-centre/apply"
  const loginRedirectDownloads = "/login?redirect=/exam-centre/downloads"

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {user ? (
        <Link href="/exam-centre/apply" className="group">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold group-hover:text-blue-600">Apply for Exam</h3>
            </CardContent>
          </Card>
        </Link>
      ) : (
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <Lock className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="font-semibold mb-2">Apply for Exam</h3>
            <p className="text-sm text-gray-500 mb-3">Login required to apply.</p>
            <Link href={loginRedirectApply}>
              <Button variant="outline">Login to continue</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <Link href="/exam-centre/syllabus" className="group">
        <Card className="flex items-center justify-centerhover:shadow-lg transition-shadow h-full">
          <CardContent className="w-full p-6 text-center">
            <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold group-hover:text-green-600">View Syllabus</h3>
          </CardContent>
        </Card>
      </Link>

      {/* <Link href="/exam-centre/results" className="group">
        <Card className="flex items-center justify-centerhover:shadow-lg transition-shadow h-full">
          <CardContent className="w-full p-6 text-center">
            <Trophy className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="font-semibold group-hover:text-yellow-600">View Results</h3>
          </CardContent>
        </Card>
      </Link> */}
      <div className="group opacity-50 pointer-events-none select-none" role="status" aria-label="View Results (disabled)" title="View Results (disabled)">
        <Card className="flex items-center justify-center transition-shadow h-full">
          <CardContent className="w-full p-6 text-center">
            <Trophy className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="font-semibold">View Results</h3>
          </CardContent>
        </Card>
      </div>

      {user ? (
        <Link href="/exam-centre/downloads" className="group">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Download className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold group-hover:text-purple-600">Downloads</h3>
            </CardContent>
          </Card>
        </Link>
      ) : (
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <Lock className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="font-semibold mb-2">Downloads</h3>
            <p className="text-sm text-gray-500 mb-3">Login required to access downloads.</p>
            <Link href={loginRedirectDownloads}>
              <Button variant="outline">Login to access</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
