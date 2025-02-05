"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the speed of light in vacuum?",
    options: ["299,792 km/s", "300,000 km/s", "3 x 10^8 m/s", "All of the above"],
    correctAnswer: 3,
  },
  {
    id: 2,
    question: "Which particle is responsible for electromagnetic force?",
    options: ["Photon", "Gluon", "W boson", "Z boson"],
    correctAnswer: 0,
  },
]

export function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    setShowResult(true)
  }

  const nextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % questions.length)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const question = questions[currentQuestion]

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Physics Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{question.question}</p>
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={
                selectedAnswer === index ? (index === question.correctAnswer ? "default" : "destructive") : "outline"
              }
              className="w-full justify-start"
              onClick={() => handleAnswer(index)}
              disabled={showResult}
            >
              {option}
            </Button>
          ))}
        </div>
        {showResult && (
          <div className="mt-4">
            <p className={selectedAnswer === question.correctAnswer ? "text-green-600" : "text-red-600"}>
              {selectedAnswer === question.correctAnswer ? "Correct!" : "Incorrect. Try again!"}
            </p>
            <Button className="mt-2" onClick={nextQuestion}>
              Next Question
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

