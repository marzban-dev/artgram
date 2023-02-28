import Like from "components/like";
import { motion, Variants } from "framer-motion";
import { Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import { IActionOverlayProps } from "./action-overlay.types";

const ActionOverlay: React.FC<IActionOverlayProps> = ({ showActions, id, user_like, setIsLiked }) => {
    const isMobile = useMediaQuery({ maxWidth: 400 });

    const actionsVariants: Variants = {
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

    return (
        <Fragment>
            <motion.div
                animate={{ opacity: showActions ? 1 : 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="h-full w-full bg-art-like-button-gradient absolute bottom-0 right-0"
            />
            <motion.div
                variants={actionsVariants}
                animate={showActions ? "show" : "hide"}
                className="absolute bottom-[2px] min-[420px]:bottom-[10px] right-[10px] min-[420px]:right-[20px]"
            >
                <Like
                    id={id}
                    initial={user_like}
                    size={isMobile ? 22 : 25}
                    onLikeCallback={() => setIsLiked(true)}
                    onDislikeCallback={() => setIsLiked(false)}
                />
            </motion.div>
        </Fragment>
    );
};

export default ActionOverlay;
