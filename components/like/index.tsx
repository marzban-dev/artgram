import { AnimatePresence, motion, Variants } from "framer-motion";
import { useLikeArtMutation } from "hooks/use-like-art";
import { useUnlikeArtMutation } from "hooks/use-unlike-art";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LikeFillIcon from "public/assets/icon/heart-fill.svg";
import LikeStrokeIcon from "public/assets/icon/heart-stroke.svg";
import { MouseEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ILikeProps } from "./like.types";

const Like: React.FC<ILikeProps> = ({ id, initial, size = 25, onLikeCallback, onDislikeCallback }) => {
    const { status } = useSession();
    const [isLiked, setIsLiked] = useState(initial);
    const { isLoading: isLikeLoading, isError: isLikeError, mutateAsync: likeArt } = useLikeArtMutation(id);
    const { isLoading: isUnlikeLoading, isError: isUnlikeError, mutateAsync: unlikeArt } = useUnlikeArtMutation(id);

    useEffect(() => {
        setIsLiked(initial);
    }, [initial]);

    useEffect(() => {
        if (isLikeError) setIsLiked((oldValue) => !oldValue);
        if (isUnlikeError) setIsLiked((oldValue) => oldValue);
    }, [isLikeError, isUnlikeError]);

    const alertUserToLogin = () => {
        toast.dismiss();
        toast(
            <div>
                To like this art please
                <Link
                    href="/auth/signin"
                    onClick={() => toast.dismiss()}
                    className="pl-[6px] font-semibold text-blue-500"
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

            if (isLiked) {
                if (onDislikeCallback) onDislikeCallback();
                await unlikeArt({ id });
            } else {
                if (onLikeCallback) onLikeCallback();
                await likeArt({ id });
            }
        } else alertUserToLogin();
    };

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
                        <LikeFillIcon className="fill-red-500" style={{ width: size }} />
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
                        <LikeStrokeIcon className="fill-white" style={{ width: size }} />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};

export default Like;
