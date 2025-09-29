import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, BookOpen } from "lucide-react"
import Wrapper from "@/components/Wrapper/Wrapper"
import { Breadcrumber } from "@/components/BreadCrumber"

const syllabusData = {
    "11": {
        title: "Class 11 Physics Syllabus",
        units: [
            {
                name: "Physical World and Measurement",
                topics: ["Physics and its scope", "Units and dimensions", "Errors in measurement"],
            },
            {
                name: "Kinematics",
                topics: ["Motion in a straight line", "Motion in a plane", "Projectile motion"],
            },
            {
                name: "Laws of Motion",
                topics: ["Newton's laws", "Friction", "Circular motion"],
            },
            {
                name: "Work, Energy and Power",
                topics: ["Work-energy theorem", "Conservation of energy", "Power"],
            },
            {
                name: "Motion of System of Particles",
                topics: ["Centre of mass", "Momentum conservation", "Collisions"],
            },
        ],
    },
    "12": {
        title: "Class 12 Physics Syllabus",
        units: [
            {
                name: "Electric Charges and Fields",
                topics: ["Coulomb's law", "Electric field", "Gauss's law"],
            },
            {
                name: "Electrostatic Potential",
                topics: ["Electric potential", "Capacitance", "Energy stored in capacitor"],
            },
            {
                name: "Current Electricity",
                topics: ["Ohm's law", "Kirchhoff's laws", "Wheatstone bridge"],
            },
            {
                name: "Magnetic Effects of Current",
                topics: ["Biot-Savart law", "Ampere's law", "Force on current-carrying conductor"],
            },
            {
                name: "Electromagnetic Induction",
                topics: ["Faraday's law", "Lenz's law", "Self and mutual inductance"],
            },
        ],
    },
}

export default function Syllabus() {
    return (
        <Wrapper>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Syllabus & Exam Pattern</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Comprehensive syllabus and exam patterns for Class 11 & 12 Physics examinations.
                    </p>
                </div>
            </section>

            {/* Syllabus Content */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <Breadcrumber
                        start="Exam Centre"
                        end="Syllabus"
                        startLink="/exam-centre"
                        endLink="/syllabus"
                        dropdownItems={[{ label: "Apply for Exam", link: "apply" }, { label: "View Results", link: "results" }, { label: "Downloads", link: "downloads" }]}
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {Object.entries(syllabusData).map(([classNum, data]) => (
                            <Card key={classNum}>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="flex items-center">
                                            <BookOpen className="mr-2 h-5 w-5" />
                                            {data.title}
                                        </CardTitle>
                                        <Badge>Class {classNum}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {data.units.map((unit, index) => (
                                            <div key={index} className="border-l-4 border-blue-500 pl-4">
                                                <h4 className="font-semibold mb-2">{unit.name}</h4>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    {unit.topics.map((topic, topicIndex) => (
                                                        <li key={topicIndex}>• {topic}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                        <Button className="w-full mt-4">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download Complete Syllabus
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Exam Pattern */}
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
        </Wrapper>
    )
}
