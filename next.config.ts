import type { NextConfig } from "next";
import { withLingo } from "@lingo.dev/compiler/next";


export const nextConfig: NextConfig = {
  /* config options here */
};


export default withLingo(nextConfig, {
  sourceRoot: './app',
  sourceLocale: 'en',
  targetLocales: ['ja', 'es', 'fr', 'de', 'ar'],
  models: 'lingo.dev',
  dev: {
    usePseudotranslator: false
  }
})