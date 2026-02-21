"use client";

import { LanguageContextProvider } from "@/context/LanguageContext";
import { LingoProvider } from "@lingo.dev/compiler/react";

const UnifiedProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LingoProvider>
      <LanguageContextProvider>{children}</LanguageContextProvider>
    </LingoProvider>
  );
};

export default UnifiedProvider;
