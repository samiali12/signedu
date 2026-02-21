"use client";

import Link from "next/link";
import { HandMetal, Github, Twitter, Globe, Heart } from "lucide-react";
import { FEATURES, LANGUAGES, TECH } from "@/constant/constant";
import T from "../shared/T";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 mt-20">
      {/* Top section */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand col */}
        <div className="md:col-span-1 flex flex-col gap-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-indigo-400 font-bold text-xl w-fit"
          >
            <HandMetal size={26} />
            SignEdu
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed">
            <T text="Learn sign language in your native language. Real-time webcam feedback, interactive lessons, and live collaborative rooms." />
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3 mt-1">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-white transition p-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-sky-400 transition p-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg"
              aria-label="Twitter"
            >
              <Twitter size={16} />
            </a>
            <a
              href="https://lingo.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-indigo-400 transition p-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg"
              aria-label="Lingo.dev"
            >
              <Globe size={16} />
            </a>
          </div>
        </div>

        {/* Features col */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
            <T text="Features" />
          </h3>
          <ul className="flex flex-col gap-2">
            {FEATURES.map((f) => (
              <li key={f.href}>
                <Link
                  href={f.href}
                  className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition group"
                >
                  <span className="text-base">{f.emoji}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform duration-150">
                    <T text={f.label} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Languages col */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
            <T text="Supported Languages" />
          </h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
            {LANGUAGES.map((lang) => (
              <li
                key={lang.label}
                className="flex items-center gap-1.5 text-gray-500 text-sm"
              >
                <span className="text-sm">{lang.flag}</span>
                <span>{lang.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Built with col */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
            <T text="Built With" />
          </h3>
          <ul className="flex flex-col gap-2">
            {TECH.map((t) => (
              <li key={t.label}>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm ${t.color} hover:opacity-80 transition flex items-center gap-1.5 group w-fit`}
                >
                  <span className="group-hover:underline underline-offset-2">
                    {t.label}
                  </span>
                  <span className="text-gray-700 text-xs">↗</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Hackathon badge */}
          <div className="mt-2 bg-indigo-950 border border-indigo-800 rounded-xl px-4 py-3">
            <p className="text-indigo-400 text-xs font-semibold mb-0.5">
              🏅 Lingo.dev Hackathon
            </p>
            <p className="text-gray-500 text-xs">
              <T text="Built in 72 hours" />
            </p>
          </div>
        </div>
      </div>

      {/* Language flags strip */}
      <div className="border-t border-gray-900 py-4">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-center gap-3 flex-wrap">
          {LANGUAGES.map((lang) => (
            <span
              key={lang.label}
              title={lang.label}
              className="text-2xl hover:scale-110 transition-transform duration-150 cursor-default"
            >
              {lang.flag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} SignEdu.{" "}
            <T text="Open source, MIT license." />
          </p>
          <p className="text-gray-600 text-xs flex items-center gap-1.5">
            <T text="Made with" />
            <Heart size={11} className="text-red-500 fill-red-500" />
            <T text="for accessibility" />
          </p>
          <p className="text-gray-700 text-xs">
            <T text="Powered by" />{" "}
            <a
              href="https://lingo.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-400 transition"
            >
              Lingo.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
