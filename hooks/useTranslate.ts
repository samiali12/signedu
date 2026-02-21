import { useEffect, useState } from "react";
import axios from "axios";

const getLocale = () => {
    const match = document.cookie.match(/locale=([^;]+)/);
    return match ? match[1] : "en";
}

const useTranslate = (text: string) => {
    const [translated, setTranslated] = useState("");

    useEffect(() => {
        const run = async () => {
            const locale = getLocale();
            if ('en' ===  locale) return text;
            const response = await axios.post("/api/translate", { text, locale })
            const data = response.data;
            setTranslated(data.translated);
        };

        run();
    }, [text]);

    return translated;
};

export default useTranslate;