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

        {/* Brand */}
        <div className="md:col-span-1 flex flex-col gap-5">

          <Link
            href="/"
            className="flex items-center gap-2 text-indigo-400 font-bold text-xl w-fit"
          >
            <HandMetal size={26} />
            SignEdu
          </Link>

          {/* STATIC */}
          <p className="text-gray-500 text-sm leading-relaxed">
            Learn sign language in your native language. Real-time webcam feedback,
            interactive lessons, and live collaborative rooms.
          </p>

          {/* Social */}
          <div className="flex items-center gap-3 mt-1">

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-white transition p-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg"
            >
              <Github size={16} />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-sky-400 transition p-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg"
            >
              <Twitter size={16} />
            </a>

            <a
              href="https://lingo.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-indigo-400 transition p-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg"
            >
              <Globe size={16} />
            </a>

          </div>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-4">

          {/* STATIC */}
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
            Features
          </h3>

          <ul className="flex flex-col gap-2">
            {FEATURES.map((f) => (

              <li key={f.href}>

                <Link
                  href={f.href}
                  className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition group"
                >
                  <span>{f.emoji}</span>

                  {/* DYNAMIC */}
                  <span>
                    <T text={f.label} />
                  </span>

                </Link>

              </li>

            ))}
          </ul>

        </div>

        {/* Languages */}
        <div className="flex flex-col gap-4">

          {/* STATIC */}
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
            Supported Languages
          </h3>

          <ul className="grid grid-cols-1 gap-x-4 gap-y-2">
            {LANGUAGES.map((lang) => (

              <li
                key={lang.label}
                className="flex items-center gap-1.5 text-gray-500 text-sm"
              >

                <span>{lang.flag}</span>

                {/* DYNAMIC */}
                <span>
                  <T text={lang.label} />
                </span>

              </li>

            ))}
          </ul>

        </div>

        {/* Tech */}
        <div className="flex flex-col gap-4">

          {/* STATIC */}
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
            Built With
          </h3>

          <ul className="flex flex-col gap-2">
            {TECH.map((t) => (

              <li key={t.label}>

                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${t.color} text-sm hover:opacity-80 transition flex items-center gap-1.5`}
                >

                  {/* DYNAMIC */}
                  <span>
                    <T text={t.label} />
                  </span>

                  <span>↗</span>

                </a>

              </li>

            ))}
          </ul>

        </div>

      </div>

      {/* Flags */}
      <div className="border-t border-gray-900 py-4">

        <div className="max-w-6xl mx-auto px-6 flex justify-center gap-3 flex-wrap">

          {LANGUAGES.map((lang) => (

            <span key={lang.label}>
              {lang.flag}
            </span>

          ))}

        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-900">

        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between gap-3">

          {/* STATIC */}
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} SignEdu. Open source, MIT license.
          </p>

          {/* STATIC */}
          <p className="text-gray-600 text-xs flex items-center gap-1.5">
            Made with
            <Heart size={11} className="text-red-500 fill-red-500" />
            for accessibility
          </p>

          {/* STATIC */}
          <p className="text-gray-700 text-xs">
            Powered by{" "}
            <a
              href="https://lingo.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-400"
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