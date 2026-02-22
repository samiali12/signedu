"use client";

import { LessonType } from "@/types/lesson";
import { ChevronRight} from "lucide-react";
import Link from "next/link";
import T from "../shared/T";

const levelColor = {
  Beginner: "bg-green-900 text-green-300",
  Intermediate: "bg-yellow-900 text-yellow-300",
  Advanced: "bg-red-900 text-red-300",
};

const LessonCard = ({ lesson }: { lesson: LessonType }) => {
  return (
    <div>
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
                <T text={lesson.level} />
              </span>
            </div>
            <p className="text-gray-400 text-sm">{lesson.description}</p>
            <p className="text-gray-600 text-xs mt-2 flex">
              {lesson.signs.length} <span className="pl-1">signs</span>
            </p>
          </div>
          <ChevronRight
            size={20}
            className="text-gray-600 group-hover:text-indigo-400 transition"
          />
        </div>
      </Link>
    </div>
  );
};

export default LessonCard;
