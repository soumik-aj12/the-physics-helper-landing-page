import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Download, Trophy, ChevronRight } from "lucide-react";
import Wrapper from "@/components/Wrapper/Wrapper";

const upcomingExams = [
    {
        id: 1,
        name: "Physics Mid-Term Exam",
        class: "11",
        date: "2024-02-15",
        registrationDeadline: "2024-02-10",
        fee: 500,
        status: "Open",
    },
    {
        id: 2,
        name: "Physics Final Exam",
        class: "12",
        date: "2024-03-20",
        registrationDeadline: "2024-03-15",
        fee: 750,
        status: "Open",
    },
    {
        id: 3,
        name: "Physics Olympiad",
        class: "11 & 12",
        date: "2024-04-10",
        registrationDeadline: "2024-04-05",
        fee: 1000,
        status: "Coming Soon",
    },
]

export default function page() {
    return (
        <Wrapper>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Exam Centre</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Apply for upcoming exams, view results, and download certificates for Class 11 & 12 Physics.
                    </p>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Link href="/exam-centre/apply" className="group">
                            <Card className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6 text-center">
                                    <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                                    <h3 className="font-semibold group-hover:text-blue-600">Apply for Exam</h3>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href="/exam-centre/syllabus" className="group">
                            <Card className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6 text-center">
                                    <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
                                    <h3 className="font-semibold group-hover:text-green-600">View Syllabus</h3>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href="/exam-centre/results" className="group">
                            <Card className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6 text-center">
                                    <Trophy className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                                    <h3 className="font-semibold group-hover:text-yellow-600">View Results</h3>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href="/exam-centre/downloads" className="group">
                            <Card className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6 text-center">
                                    <Download className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                                    <h3 className="font-semibold group-hover:text-purple-600">Downloads</h3>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Upcoming Exams */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Upcoming Exams</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {upcomingExams.map((exam) => (
                            <Card key={exam.id}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg">{exam.name}</CardTitle>
                                        <Badge variant={exam.status === "Open" ? "default" : "secondary"}>{exam.status}</Badge>
                                    </div>
                                    <p className="text-sm text-gray-600">Class {exam.class}</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between">
                                            <span className="text-sm">Exam Date:</span>
                                            <span className="text-sm font-semibold">{exam.date}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm">Registration Deadline:</span>
                                            <span className="text-sm font-semibold">{exam.registrationDeadline}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm">Fee:</span>
                                            <span className="text-sm font-semibold">₹{exam.fee}</span>
                                        </div>
                                    </div>
                                    <Link href={`/exam-centre/apply?exam=${exam.id}`}>
                                        <Button className="w-full" disabled={exam.status !== "Open"}>
                                            {exam.status === "Open" ? "Apply Now" : "Coming Soon"}
                                            <ChevronRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </Wrapper>
    )
}
