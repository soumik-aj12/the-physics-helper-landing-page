"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the speed of light in vacuum?",
    options: [
      "299,792 km/s",
      "300,000 km/s",
      "3 x 10^8 m/s",
      "All of the above",
    ],
    correctAnswer: 3,
  },
  {
    id: 2,
    question: "Which particle is responsible for electromagnetic force?",
    options: ["Photon", "Gluon", "W boson", "Z boson"],
    correctAnswer: 0,
  },
  {
    id: 3,
    question:
      "Newton's First Law states that an object will remain at rest or in motion unless acted upon by an external force.",
    options: ["True", "False"],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: "What is the SI unit of electric current?",
    options: ["Volt", "Ampere", "Ohm", "Watt"],
    correctAnswer: 1,
  },
  {
    id: 5,
    question:
      "Quantum entanglement allows for faster-than-light communication.",
    options: ["True", "False"],
    correctAnswer: 1,
  },
];

export function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);

    if (index === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const question = questions[currentQuestion];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-green-600 text-white hover:bg-green-700 hover:text-white"
        >
          Take your quiz!
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Physics Quiz</DialogTitle>
          <DialogDescription>
            Test your physics knowledge with this quick quiz.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] p-4">
          {!quizCompleted ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Question {currentQuestion + 1} of {questions.length}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="font-medium">{question.question}</p>

                    <RadioGroup
                      value={selectedAnswer?.toString()}
                      className="gap-3"
                    >
                      {question.options.map((option, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Button
                            key={index}
                            variant={
                              selectedAnswer === index
                                ? index === question.correctAnswer
                                  ? "default"
                                  : "destructive"
                                : "outline"
                            }
                            className="w-full justify-start"
                            onClick={() => handleAnswer(index)}
                            disabled={showResult}
                          >
                            {option}
                          </Button>
                        </div>
                      ))}
                    </RadioGroup>

                    {showResult && (
                      <div
                        className={`mt-4 p-3 rounded-md ${
                          selectedAnswer === question.correctAnswer
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {selectedAnswer === question.correctAnswer
                          ? "Correct!"
                          : `Incorrect. The correct answer is: ${
                              question.options[question.correctAnswer]
                            }`}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quiz Complete!</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium">
                    Your score: {score} out of {questions.length}
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    {score === questions.length
                      ? "Perfect score! Excellent work!"
                      : score >= questions.length / 2
                      ? "Good job! Keep practicing to improve your knowledge."
                      : "Keep studying! You'll do better next time."}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </ScrollArea>

        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>

          {!quizCompleted ? (
            showResult && (
              <Button onClick={nextQuestion}>
                {currentQuestion < questions.length - 1
                  ? "Next Question"
                  : "See Results"}
              </Button>
            )
          ) : (
            <Button onClick={resetQuiz}>Try Again</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
/* <Card className="w-full max-w-md">
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
    </Card> */
