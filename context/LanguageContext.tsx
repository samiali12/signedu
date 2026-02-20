"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface Language {
  lang: string;
  setLang: (locale: string) => void;
}

const LanguageContext = createContext<Language>({
  lang: "en",
  setLang: () => {},
});

export const LanguageContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [lang, setLang] = useState("en");

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => useContext(LanguageContext);
