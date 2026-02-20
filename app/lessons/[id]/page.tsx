import Lesson from "@/components/lessons/Lesson";
import { LESSONS } from "@/data/lesson";
import { translateMany } from "@/lib/translate";
import { cookies } from "next/headers";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const cookiesStore = await cookies();
  const locale = cookiesStore.get("locale")?.value || "en";

  const lesson = LESSONS.find((l) => l.id === id);

  if (!lesson) {
    return (
      <div className="text-center text-gray-400 py-20">Lesson not found.</div>
    );
  }

  const [title, signOfText] = await translateMany(
    [lesson.title, `Sign {index} of {total}`],
    locale,
  );

  const translatedSigns = await Promise.all(
    lesson.signs.map(async (sign) => {
      const [word, description, ...quizOptions] = await translateMany(
        [sign.word, sign.description, ...sign.quizOptions, sign.correctAnswer],
        locale,
      );

      return {
        ...sign,
        word,
        description,
        quizOptions,
        correctAnswer: quizOptions[quizOptions.length - 1], // last one was correctAnswer
      };
    }),
  );

  const translatedLesson = {
    ...lesson,
    title,
    signs: translatedSigns,
  };

  return <Lesson lesson={translatedLesson} locale={locale} />;
}
