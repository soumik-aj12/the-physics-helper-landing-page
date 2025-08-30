import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Key, BookOpen } from "lucide-react"
import Wrapper from "@/components/Wrapper/Wrapper"
import { Breadcrumber } from "@/components/BreadCrumber"

const downloadItems = [
    {
        title: "Answer Key - Physics Mid-Term (Class 11)",
        description: "Answer key for Class 11 Physics Mid-Term examination",
        type: "Answer Key",
        class: "11",
        date: "2024-01-15",
        icon: Key,
    },
    {
        title: "Answer Key - Physics Final (Class 12)",
        description: "Answer key for Class 12 Physics Final examination",
        type: "Answer Key",
        class: "12",
        date: "2024-01-20",
        icon: Key,
    },
    {
        title: "Sample Paper - Class 11 Physics",
        description: "Sample question paper for Class 11 Physics",
        type: "Sample Paper",
        class: "11",
        date: "2024-01-10",
        icon: FileText,
    },
    {
        title: "Sample Paper - Class 12 Physics",
        description: "Sample question paper for Class 12 Physics",
        type: "Sample Paper",
        class: "12",
        date: "2024-01-10",
        icon: FileText,
    },
    {
        title: "Study Material - Quantum Physics",
        description: "Comprehensive study material for Quantum Physics",
        type: "Study Material",
        class: "12",
        date: "2024-01-05",
        icon: BookOpen,
    },
]

export default function page() {
    return (
        <Wrapper>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Downloads</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Download answer keys, sample papers, and study materials for Class 11 & 12 Physics.
                    </p>
                </div>
            </section>

            {/* Downloads Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <Breadcrumber
                        start="Exam Centre"
                        end="Downloads"
                        startLink="exam-centre"
                        endLink="downloads"
                        dropdownItems={[{ label: "Apply for Exam", link: "apply" }, { label: "View Syllabus", link: "results" }, { label: "View Results", link: "results" }]}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {downloadItems.map((item, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center">
                                            <item.icon className="h-6 w-6 text-blue-600 mr-2" />
                                            <div>
                                                <CardTitle className="text-lg">{item.title}</CardTitle>
                                                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex space-x-2">
                                            <Badge variant="outline">Class {item.class}</Badge>
                                            <Badge variant="secondary">{item.type}</Badge>
                                        </div>
                                        <span className="text-xs text-gray-500">{item.date}</span>
                                    </div>
                                    <Button className="w-full">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </Wrapper>
    )
}
