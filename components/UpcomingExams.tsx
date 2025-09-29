"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { checkExistingExamApplication, getExams } from '@/lib/service'
import { useAuth } from './auth-context'
import FullScreenLoading from './FullScreenLoader'

const UpcomingExams = () => {
    const { user, isLoading } = useAuth();
    const [hasApplied, setHasApplied] = useState(false);
    const [upcomingExams, setUpcomingExams] = useState<
        Array<
            {
                id: number
                name: string
                classLevel: string
                date: string
                deadline: string
                fee: number
                status: string
            }
        >>([]);
    useEffect(() => {
        if (isLoading || !user) return; 
        const fetchUpcomingExams = async () => { 
            const res = await getExams(user?.classLevel!);
            const res2 = await checkExistingExamApplication(user?.uid!);
            setHasApplied(res2);
            console.log("Upcoming exams fetched:", res); 
            setUpcomingExams(res.map((exam: any) => 
                ({ 
                    id: exam.id, 
                    name: exam.name, 
                    classLevel: exam.classLevel, 
                    date: exam.date, 
                    deadline: exam.deadline, 
                    fee: exam.fee, 
                    status: exam.status, }))); }; 
            fetchUpcomingExams();
    }, [user, isLoading]);
    if (isLoading) return <FullScreenLoading isLoading={isLoading} />;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingExams.length === 0 ? (
                <p className="text-center col-span-full">No upcoming exams available.</p>
            ) : (
                upcomingExams && upcomingExams.sort((a, b) => b?.date.localeCompare(a?.date)).map((exam, index) => (
                    <Card key={exam.id}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">{exam.name}</CardTitle>
                                <Badge variant={exam.status === "open" ? "default" : "secondary"}>{exam.status.toUpperCase()}</Badge>
                            </div>
                            <p className="text-sm text-gray-600">Class {exam.classLevel}</p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-sm">Exam Date:</span>
                                    <span className="text-sm font-semibold">{exam.date}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Registration Deadline:</span>
                                    <span className="text-sm font-semibold">{exam.deadline}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Fee:</span>
                                    <span className="text-sm font-semibold">₹{exam.fee}</span>
                                </div>
                            </div>
                            <Link href={hasApplied ? "#" : `/exam-centre/apply?exam=${exam.id}`}>
                                <Button className="w-full" disabled={exam.status !== "open"|| hasApplied}>
                                    {exam.status === "open" ? (hasApplied ? "Already Applied" : "Apply Now") : "Comings Soon"}
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    )
}

export default UpcomingExams