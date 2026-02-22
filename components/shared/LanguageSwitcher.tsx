"use client";

import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useLingoContext } from "@lingo.dev/compiler/react";
import { LANGUAGES } from "@/constant/constant";

const LanguageSwitcher = () => {

  const { locale, setLocale } = useLingoContext();
  const [open, setOpen] = useState(false);

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  console.log("locale ==> ", locale)
  console.log("c == >", current)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 px-3 py-2 rounded-lg text-sm transition-all duration-150 group"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="text-gray-200 font-medium hidden sm:block">
          {current.label}
        </span>
        <ChevronDown
          size={14}
          className={`text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
              <Globe size={13} className="text-gray-500" />
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                Select Language
              </span>
            </div>
            <div className="py-1 max-h-72 overflow-y-auto scrollbar-thin">
              {LANGUAGES.map((lang) => {
                const isActive = locale === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLocale(lang.code);
                      setOpen(false);
                      window.location.reload();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-100 group
                      ${
                        isActive
                          ? "bg-indigo-950 text-indigo-300"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                  >
                    {/* Flag */}
                    <span className="text-lg leading-none w-6 text-center">
                      {lang.flag}
                    </span>

                    {/* Label */}
                    <span className="flex-1 text-left font-medium">
                      {lang.label}
                    </span>

                    {/* Region hint */}
                    <span
                      className={`text-xs ${isActive ? "text-indigo-500" : "text-gray-600 group-hover:text-gray-500"}`}
                    >
                      {lang.region}
                    </span>

                    {/* Active dot */}
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="px-4 py-2.5 border-t border-gray-800">
              <p className="text-gray-600 text-xs">
                All content auto-translates via{" "}
                <span className="text-indigo-600 font-medium">Lingo.dev</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
