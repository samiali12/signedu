"use client";

import Link from "next/link";
import { HandMetal } from "lucide-react";
import T from "../shared/T";
import { HERO_SECTION_FEATURES, HERO_SECTION_STATS } from "@/constant/constant";

const Hero = () => {
  return (
    <div className="flex flex-col items-center text-center gap-10 mt-10 py-16">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-indigo-600 p-4 rounded-2xl">
          <HandMetal size={52} className="text-white" />
        </div>

        {/* STATIC → no T */}
        <h1 className="text-5xl font-extrabold text-white leading-tight">
          Learn Sign Language
          <br />
          <span className="text-indigo-400">In Your Language</span>
        </h1>

        {/* STATIC */}
        <p className="text-gray-400 text-lg max-w-xl">
          Master ASL through interactive lessons, AI-powered feedback, and
          real-time practice sessions — all localized to your native language.
        </p>

        <div className="flex gap-4 mt-2">
          {/* STATIC */}
          <Link
            href="/lessons"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Start Learning
          </Link>

          {/* STATIC */}
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
        {HERO_SECTION_STATS.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col items-center gap-2"
          >
            <Icon size={28} className="text-indigo-400" />

            {/* dynamic value */}
            <p className="text-3xl font-bold text-white">{value}</p>

            {/* dynamic label */}
            <p className="text-gray-400 text-sm">
              <T text={label} />
            </p>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {HERO_SECTION_FEATURES.map(({ title, desc, color }) => (
          <div
            key={title}
            className={`bg-linear-to-br ${color} rounded-2xl p-6 text-left`}
          >
            {/* dynamic */}
            <h3 className="font-bold text-lg text-white mb-2">
              <T text={title} />
            </h3>

            {/* dynamic */}
            <p className="text-gray-200 text-sm">
              <T text={desc} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
