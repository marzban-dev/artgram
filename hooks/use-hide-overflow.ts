import { useEffect } from "react";

const useHideOverflow = () => {
    useEffect(() => {
        const bodyEl = document.querySelector("body") as HTMLBodyElement;
        const htmlEl = document.querySelector("html") as HTMLHtmlElement;
        bodyEl.style.overflow = "hidden";
        htmlEl.style.overflow = "hidden";

        return () => {
            const bodyEl = document.querySelector("body") as HTMLBodyElement;
            const htmlEl = document.querySelector("html") as HTMLHtmlElement;
            bodyEl.style.overflow = "auto";
            htmlEl.style.overflow = "auto";
        };
    }, []);
};

export default useHideOverflow;
