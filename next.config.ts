import type { NextConfig } from "next";
import { withLingo } from "@lingo.dev/compiler/next";


export const nextConfig: NextConfig = {
  /* config options here */
};


export default withLingo(nextConfig, {
  sourceRoot: './app',
  sourceLocale: 'en',
  targetLocales: ['pa-PK', 'en', 'ja', 'es', 'fr', 'de', 'ar', 'zh', 'pt', 'ko', 'hi', 'it'],
  models: 'lingo.dev',
  dev: {
    usePseudotranslator: false
  },
  buildMode: 'cache-only'
})