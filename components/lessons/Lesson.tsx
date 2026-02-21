"use client";

import { LessonType } from "@/types/lesson";
import { CheckCircle, ChevronRight, Trophy, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  lesson: LessonType;
  locale: string;
};

const Lesson = ({ lesson }: Props) => {
  const router = useRouter();

  const [currentSignIndex, setCurrentSignIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentSign = lesson ? lesson.signs[currentSignIndex] : null;
  const isCorrect = selectedAnswer === currentSign?.correctAnswer;
  const isAnswered = selectedAnswer !== null;

  if (!lesson)
    return (
      <div className="text-center text-gray-400 py-20">Lesson not found.</div>
    );

  const handleAnswer = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    if (option === currentSign?.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    if (currentSignIndex < lesson.signs.length - 1) {
      setCurrentSignIndex((i) => i + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const percent = Math.round((score / lesson.signs.length) * 100);
    return (
      <div className="flex flex-col items-center gap-8 py-16 text-center">
        <Trophy size={64} className="text-yellow-400" />
        <div>
          <h2 className="text-4xl font-extrabold text-white mb-2">
            Lesson Complete!
          </h2>
          <p className="text-gray-400 text-lg">
            You scored {score} out of {lesson.signs.length} ({percent}%)
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setCurrentSignIndex(0);
              setScore(0);
              setSelectedAnswer(null);
              setFinished(false);
            }}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push("/lessons")}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            All Lessons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-8 mt-16 pt-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">
            {lesson.emoji} {lesson.title}
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Sign {currentSignIndex + 1} of {lesson.signs.length}
          </p>
        </div>
        <div className="text-right">
          <div className="text-indigo-400 font-bold text-lg">{score} pts</div>
        </div>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
          style={{
            width: `${(currentSignIndex / lesson.signs.length) * 100}%`,
          }}
        />
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col items-center gap-6">
        <div className="bg-indigo-950 border border-indigo-800 rounded-xl w-full h-48 flex items-center justify-center">
          <span className="text-7xl">🤟</span>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white mb-2">
            {currentSign?.word || "No sign available"}
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            {currentSign?.description || "No description available"}
          </p>
        </div>
      </div>

      <div>
        <p className="text-gray-400 text-sm mb-3 font-medium">
          Which sign is being shown?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {currentSign?.quizOptions.map((option, index) => {
            let style =
              "bg-gray-900 border border-gray-700 hover:border-indigo-500 text-white";
            if (isAnswered && option === currentSign.correctAnswer) {
              style = "bg-green-900 border border-green-500 text-green-200";
            } else if (isAnswered && option === selectedAnswer && !isCorrect) {
              style = "bg-red-900 border border-red-500 text-red-200";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`${style} rounded-xl px-4 py-3 font-semibold text-sm transition flex items-center justify-between`}
              >
                {option}
                {isAnswered && option === currentSign.correctAnswer && (
                  <CheckCircle size={18} className="text-green-400" />
                )}
                {isAnswered && option === selectedAnswer && !isCorrect && (
                  <XCircle size={18} className="text-red-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>
      {isAnswered && (
        <div
          className={`rounded-xl px-5 py-4 flex items-center justify-between
          ${isCorrect ? "bg-green-950 border border-green-700" : "bg-red-950 border border-red-700"}`}
        >
          <span
            className={`font-semibold text-sm ${isCorrect ? "text-green-300" : "text-red-300"}`}
          >
            {isCorrect ? (
              <span>Correct! Great job! </span>
            ) : (
              <span>{`Not quite. The answer is "${currentSign?.correctAnswer}"`}</span>
            )}
          </span>
          <button
            onClick={handleNext}
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Lesson;
