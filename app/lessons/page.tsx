import Lessons from "@/components/Lessons/Lessons";
import { LESSONS } from "@/data/lesson";
import { translateMany } from "@/lib/translate";
import { cookies } from "next/headers";

export default async function page() {
  const cookiesStore = await cookies();
  const locale = cookiesStore.get("locale")?.value || "en";

  const [heading, subheading] = await translateMany(
    ["All Lessons", "Pick a lesson and start learning ASL today."],
    locale,
  );

  const translatedLessons = await Promise.all(
    LESSONS.map(async (lesson) => {
      const [title, levelLabel, description] = await translateMany(
        [lesson.title, lesson.level, lesson.description],
        locale,
      );

      return {
        ...lesson,
        title,
        level: lesson.level,
        levelLabel,
        description,
      };
    }),
  );

  return (
    <Lessons
      heading={heading}
      subheading={subheading}
      lessons={translatedLessons}
    />
  );
}
