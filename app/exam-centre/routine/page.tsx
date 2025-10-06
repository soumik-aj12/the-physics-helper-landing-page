"use client"
import Wrapper from "@/components/Wrapper/Wrapper"
import { Breadcrumber } from "@/components/BreadCrumber"
import RoutineClient from "@/components/Routine/RoutineClient"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
export default function Syllabus() {
    const [selectedClass, setSelectedClass] = useState<"10" | "11" | "12" | "All">("All");
    return (
        <Wrapper>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
                <div className="container mx-auto px-4 text-center flex flex-col items-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Syllabus & Exam Pattern</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        View Routines for Class 10, 11 & 12.
                    </p>
                    <div className="mt-7 space-y-4">
                        <div className="flex text-justify items-center">
                            <span className="mr-2">📅</span>
                            <span>All students are required to attend two classes per week – one from the First Set and one from the Second Set.</span>
                        </div>
                        <div className="flex text-justify items-center">
                            <span className="mr-2">📝</span>
                            <span>A minimum of two exams will be conducted each month, including one in the Board Exam pattern.</span>
                        </div>
                        <div className="flex text-justify items-center">
                            <span className="mr-2">🏫</span>
                            <span>All exams must be given offline.</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Syllabus Content */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-12 gap-4">
                        <Breadcrumber
                            start="Exam Centre"
                            end="Routines"
                            startLink="/exam-centre"
                            endLink="/routine"
                            dropdownItems={[{ label: "Apply for Exam", link: "apply" }, { label: "View Results", link: "results" }, { label: "Downloads", link: "downloads" }]}
                        />
                        <Select>
                            <SelectTrigger className="w-fit">
                                <SelectValue placeholder="Select Class" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10" onClick={() => setSelectedClass("10")}>Class 10</SelectItem>
                                <SelectItem value="11" onClick={() => setSelectedClass("11")}>Class 11</SelectItem>
                                <SelectItem value="12" onClick={() => setSelectedClass("12")}>Class 12</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <RoutineClient selectedClass={selectedClass} />
                    </div>
                </div>
            </section>

            {/* Exam Pattern */}
            {/*
               <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Exam Pattern</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Class 11 Exam Pattern</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span>Duration:</span>
                                        <span className="font-semibold">3 hours</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Total Marks:</span>
                                        <span className="font-semibold">100</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Multiple Choice:</span>
                                        <span className="font-semibold">40 marks</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Short Answer:</span>
                                        <span className="font-semibold">30 marks</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Long Answer:</span>
                                        <span className="font-semibold">30 marks</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Class 12 Exam Pattern</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span>Duration:</span>
                                        <span className="font-semibold">3 hours</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Total Marks:</span>
                                        <span className="font-semibold">100</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Multiple Choice:</span>
                                        <span className="font-semibold">35 marks</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Short Answer:</span>
                                        <span className="font-semibold">35 marks</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Long Answer:</span>
                                        <span className="font-semibold">30 marks</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            */}

        </Wrapper>
    )
}
