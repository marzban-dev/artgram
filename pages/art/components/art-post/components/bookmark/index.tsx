import { AnimatePresence, motion, useAnimation, Variants } from "framer-motion";
import { useSaveArtMutation } from "hooks/use-save-art";
import { useUnsaveArtMutation } from "hooks/use-unsave-art";
import { useSession } from "next-auth/react";
import Link from "next/link";
import BookmarkFillIcon from "public/assets/icon/bookmark-fill.svg";
import BookmarkStrokeIcon from "public/assets/icon/bookmark-stroke.svg";
import { MouseEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IBookmarkProps } from "./bookmark.types";

const Bookmark: React.FC<IBookmarkProps> = ({ id }) => {
    const { data, status } = useSession();
    const animationControl = useAnimation();
    const [isSaved, setIsSaved] = useState(false);
    const { isError: isSaveArtError, mutateAsync: saveArt } = useSaveArtMutation();
    const { isError: isUnsaveArtError, mutateAsync: unsaveArt } = useUnsaveArtMutation();

    useEffect(() => {
        if (isSaveArtError) {
            setIsSaved(!isSaved);
            animationControl.start("bobble");
        }
        if (isUnsaveArtError) {
            setIsSaved(isSaved);
            animationControl.start("bobble");
        }
    }, [isSaveArtError, isUnsaveArtError]);

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

    const onSave = async (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (status === "authenticated") {
            setIsSaved(!isSaved);
            animationControl.start("bobble");

            if (isSaved) await unsaveArt({ id, token: data!.accessToken });
            else await saveArt({ id, token: data!.accessToken });
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
        <button onClick={onSave} className="relative">
            <AnimatePresence initial={false} mode="popLayout">
                {isSaved && (
                    <motion.div
                        variants={iconVariants}
                        initial="hide"
                        animate="show"
                        exit="hide"
                        data-testid="icon-fill"
                        key={1}
                    >
                        <BookmarkFillIcon className="fill-white w-[18px]" />
                    </motion.div>
                )}
                {!isSaved && (
                    <motion.div
                        variants={iconVariants}
                        initial="hide"
                        animate="show"
                        exit="hide"
                        data-testid="icon-stroke"
                        key={2}
                    >
                        <BookmarkStrokeIcon className="fill-white w-[18px]" />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};

export default Bookmark;
