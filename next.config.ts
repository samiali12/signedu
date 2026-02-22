import type { NextConfig } from "next";
import { withLingo } from "@lingo.dev/compiler/next";


export const nextConfig: NextConfig = {
  /* config options here */
};


export default withLingo(nextConfig, {
  sourceRoot: './app',
  sourceLocale: 'en',
  targetLocales: ['en', 'es', 'zh', 'ar'],
  models: 'lingo.dev',
  dev: {
    usePseudotranslator: false
  },
  buildMode: 'cache-only'
})