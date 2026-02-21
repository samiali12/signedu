import { BookOpen } from "lucide-react";
import LessonCard from "./LessonCard";
import { LessonType } from "@/types/lesson";

type Props = {
  heading: string;
  subheading: string;
  lessons: LessonType[];
};

const Lessons = ({ heading, lessons, subheading }: Props) => {
  return (
    <div className="flex flex-col gap-8 p-6 md:p-10 mt-16">
      <div className="flex items-center gap-3">
        <BookOpen size={32} className="text-indigo-400" />
        <div>
          <h1 className="text-3xl font-extrabold text-white">{heading}</h1>
          <p className="text-gray-400 text-sm mt-1">{subheading}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {lessons.map((lesson, index) => (
          <LessonCard key={index} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};

export default Lessons;
