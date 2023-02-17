import { useEffect, useState } from "react";
import MagnifyGlassIcon from "public/assets/icon/magnifying-glass.svg";
import PlusIcon from "public/assets/icon/circle-plus.svg";
import UserIcon from "public/assets/img/test3.jpg";
import NavButton from "./components/link-button";
import { useRouter } from "next/router";
import { AnimatePresence, motion, Variants } from "framer-motion";

const FloatNavbar: React.FC = () => {
    const router = useRouter();
    const [showFloatNavbar, setShowFloatNavbar] = useState(false);

    const isArtPage = router.pathname.includes("/art");

    useEffect(() => {
        if (isArtPage) setShowFloatNavbar(true);
        else setShowFloatNavbar(false);

        const onWindowScroll = () => {
            if (window.scrollY >= window.innerHeight / 2) {
                setShowFloatNavbar(true);
            } else {
                if (!isArtPage) setShowFloatNavbar(false);
            }
        };

        window.addEventListener("scroll", onWindowScroll);
        return () => window.removeEventListener("scroll", onWindowScroll);
    }, [router.pathname]);

    const navVariants: Variants = {
        hide: {
            scale: 0.8,
            opacity: 0,
            transition: {
                duration: 0.1,
                scale: {
                    duration: 0.15,
                },
            },
        },
        show: {
            scale: 1,
            opacity: 1,
        },
    };

    return (
        <nav className="fixed min-[750px]:left-[10px] max-[749px]:bottom-[8px] max-[749px]:w-full min-[750px]:top-0 w-[60px] min-[750px]:h-full z-[1000] flex justify-center items-center">
            <motion.ul
                variants={navVariants}
                animate={showFloatNavbar ? "show" : "hide"}
                className="max-[749px]:bg-[rgb(12,12,12)] max-[749px]:py-3 max-[749px]:px-10 rounded-[30px] flex min-[750px]:flex-col justify-center items-center gap-10 min-[750px]:gap-8"
            >
                <NavButton icon={MagnifyGlassIcon} route="/explore" />
                <NavButton icon={PlusIcon} route="/request" />
                <NavButton avatar={UserIcon} route="/profile/user/me" attention />
            </motion.ul>
        </nav>
    );
};
export default FloatNavbar;
