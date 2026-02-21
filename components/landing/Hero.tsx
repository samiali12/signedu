import Link from "next/link";
import { HandMetal, BookOpen, Users, Trophy } from "lucide-react";
import { cookies } from "next/headers";
import { translateText } from "@/lib/translate";

const Hero = async () => {
  const store = await cookies();
  const locale = store.get("locale")?.value || "en";

  return (
    <div className="flex flex-col items-center text-center gap-10 py-16">
      {/* Hero */}
      <div className="flex flex-col items-center gap-4">
        <div className="bg-indigo-600 p-4 rounded-2xl">
          <HandMetal size={52} className="text-white" />
        </div>
        <h1 className="text-5xl font-extrabold text-white leading-tight">
          Learn Sign Language
          <br />
          <span className="text-indigo-400">In Your Language</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl">
          Master ASL through interactive lessons, AI-powered feedback, and
          real-time practice sessions — all localized to your native language.
        </p>
        <div className="flex gap-4 mt-2">
          <Link
            href="/lessons"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Start Learning
          </Link>
          <Link
            href="/jam"
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Join Sign Jam
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 w-full max-w-2xl">
        {[
          {
            label: await translateText("Lessons", locale),
            value: "24+",
            icon: BookOpen,
          },
          {
            label: await translateText("Languages", locale),
            value: "6",
            icon: Users,
          },
          {
            label: await translateText("Signs Learned", locale),
            value: "1.2k",
            icon: Trophy,
          },
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col items-center gap-2"
          >
            <Icon size={28} className="text-indigo-400" />
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-gray-400 text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {[
          {
            title: "Interactive Lessons",
            desc: "Step-by-step ASL lessons explained in your native language with video demonstrations.",
            color: "from-indigo-600 to-indigo-800",
          },
          {
            title: "AI Sign Feedback",
            desc: "Use your webcam to practice signs and get real-time accuracy feedback powered by AI.",
            color: "from-violet-600 to-violet-800",
          },
          {
            title: "Sign Jam Rooms",
            desc: "Practice with learners worldwide. Signs are auto-translated for every participant.",
            color: "from-fuchsia-600 to-fuchsia-800",
          },
        ].map(async ({ title, desc, color }) => (
          <div
            key={title}
            className={`bg-linear-to-br ${color} rounded-2xl p-6 text-left`}
          >
            <h3 className="font-bold text-lg text-white mb-2">
              {await translateText(title, locale)}
            </h3>
            <p className="text-gray-200 text-sm">
              {await translateText(desc, locale)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
