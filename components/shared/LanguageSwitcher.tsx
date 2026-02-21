"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { useLingoContext } from "@lingo.dev/compiler/react";
import { LANGUAGES } from "@/constant/constant";

const LanguageSwitcher = () => {
  const { locale, setLocale } = useLingoContext();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg text-sm transition"
      >
        <Globe size={16} />
        {LANGUAGES.find((l) => l.code === locale)?.label}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-xl shadow-xl border border-gray-700 z-50 overflow-hidden">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLocale(lang.code);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition
                ${locale === lang.code ? "text-indigo-400 font-semibold" : "text-gray-300"}`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
