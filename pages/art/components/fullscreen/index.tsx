import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import FullscreenWrapper from "./components/fullscreen-wrapper";

const Fullscreen: React.FC = () => {
    const fullscreenArt = useSelector((state: RootState) => state.app.fullscreenArt);

    /**
     * Prevent arts container to scroll, when fullscreen mode is active.
     */
    useEffect(() => {
        const bodyElement = document.querySelector("body") as HTMLBodyElement;
        if (fullscreenArt) bodyElement.style.overflowY = "hidden";

        return () => {
            const bodyElement = document.querySelector("body") as HTMLBodyElement;
            bodyElement.style.overflowY = "scroll";
        };
    }, [fullscreenArt]);

    return (
        <AnimatePresence>
            {fullscreenArt && <FullscreenWrapper fullscreenArt={fullscreenArt} />}
        </AnimatePresence>
    );
};

export default Fullscreen;
