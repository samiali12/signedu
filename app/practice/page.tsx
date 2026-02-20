import Practice from "@/components/practice/Practice";
import { practice_sign } from "@/data/practice";
import { translateText } from "@/lib/translate";
import { cookies } from "next/headers";

const page = async () => {
  const cookiesStore = await cookies();
  const locale = cookiesStore.get("locale")?.value || "en";

  const translatedSign = await Promise.all(
    practice_sign.map(async (sign) => {
      return {
        id: sign.id,
        emoji: sign.emoji,
        word: await translateText(sign.word, locale),
        instruction: await translateText(sign.instruction, locale),
      };
    }),
  );

  return (
    <div>
      <Practice practice_sign={translatedSign} />
    </div>
  );
};

export default page;
