import classNames from "classnames";
import UserProfile from "components/user-profile";
import { motion, Variants } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import PlusIcon from "public/assets/icon/circle-plus.svg";
import MagnifyGlassIcon from "public/assets/icon/magnifying-glass.svg";
import UserIcon from "public/assets/icon/user.svg";
import { useEffect, useMemo, useState } from "react";
import NavButton from "./components/link-button";

const FloatNavbar: React.FC = () => {
    const router = useRouter();
    const { status, data } = useSession();
    const [showFloatNavbar, setShowFloatNavbar] = useState(false);

    const isArtPage = router.query.slug;

    const shouldRenderAtFirst = useMemo(() => {
        // home page
        if (router.pathname === "/[[...slug]]" && !router.query.slug) return false;
        // art page
        if (router.query.slug) return true;
        // profile page
        return router.pathname.includes("/profile");
    }, [router.pathname, router.query]);

    useEffect(() => {
        if (shouldRenderAtFirst) setShowFloatNavbar(true);
        else setShowFloatNavbar(false);

        const onWindowScroll = () => {
            if (window.scrollY >= window.innerHeight / 2) {
                setShowFloatNavbar(true);
            } else {
                if (!shouldRenderAtFirst) setShowFloatNavbar(false);
            }
        };

        window.addEventListener("scroll", onWindowScroll);
        return () => window.removeEventListener("scroll", onWindowScroll);
    }, [shouldRenderAtFirst]);

    const navVariants: Variants = {
        hide: {
            opacity: 0,
            transition: {
                duration: 0.2,
            },
        },
        show: {
            opacity: 1,
            transition: {
                duration: 0.2,
            },
        },
    };

    const navClasses = classNames({
        "fixed min-[750px]:left-[10px] max-[749px]:bottom-[8px] max-[749px]:w-full min-[750px]:top-0 w-[60px] min-[750px]:h-full z-[800] flex justify-center items-center": 1,
        "max-[519px]:bottom-0": isArtPage,
    });

    const ulClasses = classNames({
        "max-[749px]:bg-[rgb(12,12,12)] max-[749px]:h-[50px] max-[749px]:px-10 flex min-[750px]:flex-col justify-center items-center gap-10 min-[750px]:gap-8": 1,
        "min-[520px]:rounded-[30px] max-[519px]:w-full max-[519px]:h-[60px] max-[519px]:border-t max-[519px]:border-t-[rgb(25,25,25)]":
            isArtPage,
        "rounded-[30px]": !isArtPage,
    });

    return (
        <nav className={navClasses}>
            <motion.ul variants={navVariants} animate={showFloatNavbar ? "show" : "hide"} className={ulClasses}>
                <NavButton icon={MagnifyGlassIcon} route="/" />
                <NavButton icon={PlusIcon} route="/request" />
                {status === "authenticated" ? (
                    <NavButton route={`/profile/user/${data.user.username}`}>
                        <UserProfile />
                    </NavButton>
                ) : (
                    <NavButton icon={UserIcon} route="/auth/signin" />
                )}
            </motion.ul>
        </nav>
    );
};
export default FloatNavbar;
