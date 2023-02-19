import { motion, Variants } from "framer-motion";
import { useNotificationsQuery } from "hooks/use-notifications";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import PlusIcon from "public/assets/icon/circle-plus.svg";
import MagnifyGlassIcon from "public/assets/icon/magnifying-glass.svg";
import UserIcon from "public/assets/icon/user.svg";
import { useEffect, useState } from "react";
import NavButton from "./components/link-button";

const FloatNavbar: React.FC = () => {
    const router = useRouter();
    const { status, data } = useSession();
    const [showFloatNavbar, setShowFloatNavbar] = useState(false);
    const { data: notifications } = useNotificationsQuery();

    const showAtFirst = router.pathname.includes("/art") || router.pathname.includes("/profile");

    useEffect(() => {
        if (showAtFirst) setShowFloatNavbar(true);
        else setShowFloatNavbar(false);

        const onWindowScroll = () => {
            if (window.scrollY >= window.innerHeight / 2) {
                setShowFloatNavbar(true);
            } else {
                if (!showAtFirst) setShowFloatNavbar(false);
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
        <nav className="fixed min-[750px]:left-[10px] max-[749px]:bottom-[8px] max-[749px]:w-full min-[750px]:top-0 w-[60px] min-[750px]:h-full z-[800] flex justify-center items-center">
            <motion.ul
                variants={navVariants}
                animate={showFloatNavbar ? "show" : "hide"}
                className="max-[749px]:bg-[rgb(12,12,12)] max-[749px]:py-3 max-[749px]:px-10 rounded-[30px] flex min-[750px]:flex-col justify-center items-center gap-10 min-[750px]:gap-8"
            >
                <NavButton icon={MagnifyGlassIcon} route="/explore" />
                <NavButton icon={PlusIcon} route="/request" />
                {status === "authenticated" ? (
                    <NavButton
                        avatar={data.user.profile_img}
                        route={`/profile/user/${data.user.username}`}
                        attention={notifications && notifications.pages.at(-1)!.count !== 0}
                    />
                ) : (
                    <NavButton icon={UserIcon} route="/auth/signin" />
                )}
            </motion.ul>
        </nav>
    );
};
export default FloatNavbar;
