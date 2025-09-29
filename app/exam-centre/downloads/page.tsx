import Wrapper from "@/components/Wrapper/Wrapper"
import { Breadcrumber } from "@/components/BreadCrumber"
import Downloads from "@/components/Downloads/Downloads"

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
                        startLink="/exam-centre"
                        endLink="downloads"
                        dropdownItems={[{ label: "Apply for Exam", link: "apply" }, { label: "View Syllabus", link: "syllabus" }, { label: "View Results", link: "results" }]}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Downloads/>
                    </div>
                </div>
            </section>
        </Wrapper>
    )
}
