"use client";
import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";

const levelColor = {
  Beginner: "bg-green-900 text-green-300",
  Intermediate: "bg-yellow-900 text-yellow-300",
  Advanced: "bg-red-900 text-red-300",
};

type Lesson = (typeof import("@/data/lesson").LESSONS)[number] & {
  title: string;
  levelLabel: string;
  description: string;
};

type Props = {
  heading: string;
  subheading: string;
  lessons: Lesson[];
};

const Lessons = ({ heading, lessons, subheading }: Props) => {
  return (
    <div className="flex flex-col gap-8 p-6 md:p-10">
      <div className="flex items-center gap-3">
        <BookOpen size={32} className="text-indigo-400" />
        <div>
          <h1 className="text-3xl font-extrabold text-white">{heading}</h1>
          <p className="text-gray-400 text-sm mt-1">{subheading}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {lessons.map((lesson) => (
          <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
            <div className="bg-gray-900 border border-gray-800 hover:border-indigo-600 rounded-2xl p-6 flex items-center gap-5 transition group cursor-pointer">
              <div className="text-5xl">{lesson.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="font-bold text-lg text-white group-hover:text-indigo-400 transition">
                    {lesson.title}
                  </h2>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      levelColor[lesson.level as keyof typeof levelColor]
                    }`}
                  >
                    {lesson.levelLabel}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{lesson.description}</p>
                <p className="text-gray-600 text-xs mt-2 flex">
                  {lesson.signs.length} <p className="pl-1">signs</p>
                </p>
              </div>
              <ChevronRight
                size={20}
                className="text-gray-600 group-hover:text-indigo-400 transition"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Lessons;
