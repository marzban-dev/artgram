import classNames from "classnames";
import { AnimatePresence, motion, useAnimation, Variants } from "framer-motion";
import { useLikeArt } from "hooks/use-like-art";
import { useUnlikeArt } from "hooks/use-unlike-art";
import { useSession } from "next-auth/react";
import LikeFillIcon from "public/assets/icon/heart-fill.svg";
import LikeStrokeIcon from "public/assets/icon/heart-stroke.svg";
import { MouseEvent, useEffect, useState } from "react";
import { ILikeProps } from "./like.types";
import toast from "react-hot-toast";
import Link from "next/link";

const Like: React.FC<ILikeProps> = ({ id }) => {
    const { data, status } = useSession();
    const animationControl = useAnimation();
    const [isLiked, setIsLiked] = useState(false);
    const { isLoading: isLikeLoading, isError: isLikeError, mutateAsync: likeArt } = useLikeArt(id);
    const { isLoading: isUnlikeLoading, isError: isUnlikeError, mutateAsync: unlikeArt } = useUnlikeArt(id);

    useEffect(() => {
        if (isLikeError) {
            setIsLiked(!isLiked);
            animationControl.start("bobble");
        }
        if (isUnlikeError) {
            setIsLiked(isLiked);
            animationControl.start("bobble");
        }
    }, [isLikeError, isUnlikeError]);

    const alertUserToLogin = () => {
        toast.dismiss();
        toast(
            <div>
                To like this art please
                <Link
                    href="/auth/signin"
                    onClick={() => toast.dismiss()}
                    className="text-blue-500 font-semibold pl-[6px]"
                >
                    signin
                </Link>
            </div>
        );
    };

    const onLike = async (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (status === "authenticated") {
            setIsLiked(!isLiked);
            animationControl.start("bobble");

            if (isLikeLoading) await unlikeArt({ id, token: data!.accessToken });
            else await likeArt({ id, token: data!.accessToken });
        } else alertUserToLogin();
    };

    const borderClasses = classNames({
        "border-2 rounded-full absolute w-full h-full top-0 opacity-0 scale-0 z-20": 1,
        "border-red-500": isLiked,
        "border-[rgba(255,255,255,0.5)]": !isLiked,
    });

    const iconVariants: Variants = {
        hide: {
            opacity: 0,
            scale: 0,
            transition: {
                opacity: {
                    duration: 0.1,
                },
                scale: {
                    type: "spring",
                    stiffness: 300,
                    damping: 12,
                    duration: 0.2,
                },
            },
        },
        show: {
            opacity: 1,
            scale: 1,
            transition: {
                opacity: {
                    duration: 0.1,
                },
                scale: {
                    type: "spring",
                    stiffness: 300,
                    damping: 12,
                    duration: 0.2,
                },
            },
        },
    };

    const borderVariants: Variants = {
        bobble: {
            opacity: [0.8, 0],
            scale: [0, 4],
            transition: {
                opacity: {
                    duration: 0.2,
                },
                scale: {
                    duration: 0.3,
                },
            },
        },
    };

    return (
        <button onClick={onLike} className="relative">
            <AnimatePresence initial={false} mode="popLayout">
                {isLiked && (
                    <motion.div
                        variants={iconVariants}
                        initial="hide"
                        animate="show"
                        exit="hide"
                        data-testid="icon-fill"
                        key={1}
                    >
                        <LikeFillIcon className="fill-red-500 w-[25px]" />
                    </motion.div>
                )}
                {!isLiked && (
                    <motion.div
                        variants={iconVariants}
                        initial="hide"
                        animate="show"
                        exit="hide"
                        data-testid="icon-stroke"
                        key={2}
                    >
                        <LikeStrokeIcon className="fill-white w-[25px]" />
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div variants={borderVariants} className={borderClasses} animate={animationControl} />
        </button>
    );
};

export default Like;
