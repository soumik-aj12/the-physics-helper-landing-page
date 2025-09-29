"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Trophy } from "lucide-react"
import Wrapper from "@/components/Wrapper/Wrapper"
import { Breadcrumber } from "@/components/BreadCrumber"
import { searchResultsProps } from "@/lib/types"

const mockResults = [
    {
        rollNumber: "PH11001",
        name: "John Doe",
        class: "11",
        exam: "Physics Mid-Term",
        marks: 85,
        grade: "A",
        status: "Pass",
    },
    {
        rollNumber: "PH12001",
        name: "Jane Smith",
        class: "12",
        exam: "Physics Final",
        marks: 92,
        grade: "A+",
        status: "Pass",
    },
]

export default function Results() {
    const [searchRoll, setSearchRoll] = useState("")
    const [searchResult, setSearchResult] = useState<searchResultsProps | undefined>(undefined)

const handleSearch = () => {
    const result = mockResults.find((r) => r.rollNumber === searchRoll)
    setSearchResult(result)
    setSearched(true)
}
    const [searched, setSearched] = useState(false)

    return (
        <Wrapper>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Exam Results</h1>
                    <p className="text-xl max-w-3xl mx-auto">Check your exam results and download your marksheet.</p>
                </div>
            </section>

            {/* Search Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-2xl">
                    <Breadcrumber
                        start="Exam Centre"
                        end="Results"
                        startLink="/exam-centre"
                        endLink="results"
                        dropdownItems={[{ label: "Apply for Exam", link: "apply" }, { label: "View Syllabus", link: "syllabus" }, { label: "Downloads", link: "downloads" }]}
                    />
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Search className="mr-2 h-5 w-5" />
                                Search Results
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="rollNumber">Enter Roll Number</Label>
                                    <Input
                                        id="rollNumber"
                                        value={searchRoll}
                                        onChange={(e) => setSearchRoll(e.target.value)}
                                        placeholder="e.g., PH11001"
                                    />
                                </div>
                                <Button onClick={handleSearch} className="w-full">
                                    <Search className="mr-2 h-4 w-4" />
                                    Search Results
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {searched && (
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Search Result</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {searchResult ? (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-sm text-gray-600">Name:</span>
                                                <p className="font-semibold">{searchResult.name}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-600">Roll Number:</span>
                                                <p className="font-semibold">{searchResult.rollNumber}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-600">Class:</span>
                                                <p className="font-semibold">{searchResult.class}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-600">Exam:</span>
                                                <p className="font-semibold">{searchResult.exam}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-600">Marks:</span>
                                                <p className="font-semibold">{searchResult.marks}/100</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-600">Grade:</span>
                                                <Badge variant={searchResult.status === "Pass" ? "default" : "destructive"}>
                                                    {searchResult.grade}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg">
                                            <Trophy className="h-8 w-8 text-green-600 mr-2" />
                                            <span className="text-green-800 font-semibold">Congratulations! You have passed the exam.</span>
                                        </div>
                                        <Button className="w-full">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download Marksheet
                                        </Button>
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-600">No results found for the entered roll number.</p>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </section>
        </Wrapper>
    )
}
