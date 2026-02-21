import { useEffect, useState } from "react";
import axios from "axios";

const getLocale = () => {
    const match = document.cookie.match(/locale=([^;]+)/);
    return match ? match[1] : "en";
}

const useTranslate = (text: string) => {
    const [translated, setTranslated] = useState(text);

    useEffect(() => {
        const run = async () => {
            const locale = getLocale();
            console.log("l ==> ", locale)
            if ('en' ==  locale) return translated;
            const response = await axios.post("/api/translate", { text, locale })
            const data = response.data;
            setTranslated(data.translated);
        };

        run();
    }, [text, translated]);

    return translated;
};

export default useTranslate;