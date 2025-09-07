"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import FullScreenLoading from "../FullScreenLoader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Key } from "lucide-react"
import Link from "next/link"

type DocumentData = {
    id: string
    title: string
    subject: string
    classLevel?: "11" | "12"
    fileType: string
    downloadURL: string
    createdAt?: any
}

export default function Downloads() {
    const [docs, setDocs] = useState<DocumentData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const q = query(collection(db, "documents"), orderBy("createdAt", "desc"));
        const unsub = onSnapshot(q, (snap) => {
            const items: DocumentData[] = []
            snap.forEach((d) => {
                const data = d.data() as DocumentData
                const { id, ...rest } = data;
                items.push({ id: d.id, ...rest })
            })
            setDocs(items)
            setLoading(false)
        })
        return () => unsub()
    }, [])

    if (loading) return <FullScreenLoading isLoading={loading} />
    if (!docs.length) return <p>No documents available.</p>

    return (
        <>
            {docs.map((item) => (
                <Card key={item.id}>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center">
                                {item.fileType === "ak"?<Key className="h-6 w-6 text-blue-600 mr-2" />: <FileText className="text-blue-600 mr-2"/>}
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
                                <Badge variant="secondary">{item.fileType === "ak"?"Answer Key": "Sample Paper"}</Badge>
                            </div>
                            <span className="text-xs text-gray-500">{item.createdAt?.toDate().toLocaleDateString()}</span>
                        </div>
                        <Link href={item.downloadURL} target="_blank" rel="noopener noreferrer">
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
