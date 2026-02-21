import { translateText } from "@/lib/translate";

export async function POST(request: Request) {

    try {
        const { text, locale } = await request.json();
        const translated = await translateText(text, locale)
        return Response.json({
            translated
        })

    } catch (error) {
        console.error("TRANSLATE API ERROR:", error);
        return Response.json(
            { error: "Translation failed" },
            { status: 500 }
        );
    }
}