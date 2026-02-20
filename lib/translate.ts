import { LingoDotDevEngine } from "lingo.dev/sdk";

let engine: LingoDotDevEngine | null = null;

export const getEngine = () => {
    if (!engine) {
        if (!process.env.LINGODOTDEV_API_KEY) {
            throw new Error('LINGODOTDEV_API_KEY is not set in environment variables');
        }
        engine = new LingoDotDevEngine({
            apiKey: process.env.LINGODOTDEV_API_KEY
        })
    }
    return engine;
}

export const translateText = async (text: string, targetLocale: string, options: { sourceLocale?: string; context?: string } = {}) : Promise<string> => {
    if (targetLocale === 'en') return text;
    try {
        const result = await getEngine().localizeText(
            text, {
            sourceLocale: options.sourceLocale || 'en',
            targetLocale,
        }
        );
        return result;

    } catch (error) {
        console.error('Translation failed:', error);
        return text;
    }
}

export const translateMany = async (texts: string[], targetLocale: string, options: { sourceLocale?: string; context?: string } = {}) : Promise<string[]> => {
    if (targetLocale === 'en') return texts;
    try {
        const result = Promise.all(texts.map(text => getEngine().localizeText(text, {
            sourceLocale: options.sourceLocale || 'en',
            targetLocale,
        })))
        return result;
    } catch (error) {
        console.error('Translation failed:', error);
        return texts;
    }
}

export const translateObject = async <T extends Record<string, unknown>>(obj: T, targetLocale: string) : Promise<T> => {
    if (targetLocale === 'en') return obj;
    try {
        const result = await getEngine().localizeObject(obj, {
            sourceLocale: 'en',
            targetLocale,
        });
        return result as T;
    } catch (error) {
        console.error('Object translation failed:', error);
        return obj;
    }
}