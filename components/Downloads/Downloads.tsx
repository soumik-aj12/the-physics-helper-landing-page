"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore"
import FullScreenLoading from "../FullScreenLoader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Key } from "lucide-react"
import Link from "next/link"
import { useAuth } from "../auth-context"
import { getAdmitCardURL } from "@/lib/service"

type DocumentData = {
  id: string
  title: string
  subject: string
  classLevel?: "11" | "12" | "10"
  fileType: string
  downloadURL: string
  createdAt?: any
}

export default function Downloads() {
  const { user, isLoading } = useAuth()
  const [docs, setDocs] = useState<DocumentData[]>([])
  const [loadingDocs, setLoadingDocs] = useState(true)
  const [admitCard, setAdmitCard] = useState<string | null>(null)
  useEffect(() => {
    if (isLoading || !user) return // ⬅️ wait until user is ready

    const q = query(
      collection(db, "documents"),
      where("classLevel", "==", user.classLevel),
      orderBy("createdAt", "desc")
    )

    const unsub = onSnapshot(q, (snap) => {
      const items: DocumentData[] = []
      snap.forEach((d) => {
        const data = d.data() as DocumentData
        items.push({ ...data })
      })
      setDocs(items)
      setLoadingDocs(false)
    })
    // Fetch Admit Card URL
    getAdmitCardURL(user.uid).then((url) => setAdmitCard(url))
    return () => unsub()
  }, [user, isLoading])

  // 🔹 UI states
  if (isLoading || loadingDocs) return <FullScreenLoading isLoading />
  if (!docs.length) return <p>No documents available.</p>

  return (
    <>
      {admitCard && (
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                  <FileText className="text-blue-600 mr-2" />
                <div>
                  <CardTitle className="text-lg">Admit Card</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Admit Card for your exam</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link
              href={admitCard}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
      {docs && docs.map((item, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                {item.fileType === "ak" ? (
                  <Key className="h-6 w-6 text-blue-600 mr-2" />
                ) : (
                  <FileText className="text-blue-600 mr-2" />
                )}
                <div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{item.subject}</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                <Badge variant="outline">Class {item.classLevel || "All"}</Badge>
                <Badge variant="secondary">
                  {item.fileType === "ak" ? "Answer Key" : "Sample Paper"}
                </Badge>
              </div>
              {item.createdAt && (
                <span className="text-xs text-gray-500">
                  {item.createdAt.toDate().toLocaleDateString()}
                </span>
              )}
            </div>
            <Link
              href={item.downloadURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
