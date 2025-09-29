import { ExamQuickActions } from "@/components/ExamQuickActions"
import Wrapper from "@/components/Wrapper/Wrapper"
import UpcomingExams from "@/components/UpcomingExams"


export default function ExamCentre() {
  return (
    <Wrapper>
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Exam Centre</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Apply for upcoming exams, view results, and download resources for Class 11 & 12 Physics.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <ExamQuickActions />
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Upcoming Exams</h2>
          <UpcomingExams/>
        </div>
      </section>
    </Wrapper>
  )
}
