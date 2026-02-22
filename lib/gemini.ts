import { GoogleGenAI } from "@google/genai";

export const gemini = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
