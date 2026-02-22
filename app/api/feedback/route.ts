import { gemini } from "@/lib/gemini";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { imageBase64, signWord } = await req.json();

        if (!imageBase64 || !signWord) {
            return NextResponse.json(
                { error: "Missing imageBase64 or signWord" },
                { status: 400 }
            );
        }

        // get language from cookie
        const cookieStore = await cookies();
        const lang = cookieStore.get("locale")?.value || "en";

        const languageNames: Record<string, string> = {
            en: "English",
            es: "Spanish",
            ar: "Arabic",
            zh: "Chinese",
        };

        const respondIn = languageNames[lang] || "English";

        // remove base64 prefix if present
        const cleanBase64 = imageBase64.includes(",")
            ? imageBase64.split(",")[1]
            : imageBase64;

        const prompt = `You are a friendly ASL teacher reviewing a student's hand sign.

The student is attempting the sign for: "${signWord}"

Give SHORT, specific, encouraging feedback.

Rules:
- Maximum 2–3 sentences
- Be specific about fingers, hand shape, or wrist angle
- Always encouraging
- If correct, celebrate and give one improvement tip
- Respond only in ${respondIn}
- Speak directly to the student`;

        const response = await gemini.models.generateContent({
            model: "gemini-2.0-flash",

            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            inlineData: {
                                mimeType: "image/jpeg",
                                data: cleanBase64,
                            },
                        },
                        {
                            text: prompt,
                        },
                    ],
                },
            ],
        });

        const feedback =
            response?.text ||
            "Good effort! Try adjusting your fingers slightly for better accuracy.";

        return NextResponse.json({ feedback });
    } catch (error) {
        console.error("Gemini error:", error);

        return NextResponse.json({
            feedback: "Keep practicing, you're doing great!",
        });
    }
}