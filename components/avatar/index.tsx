import classNames from "classnames";
import Placeholder from "components/placeholder";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { IAvatarProps } from "./avatar.types";

const Avatar: React.FC<IAvatarProps> = ({ picture, square, title, width, height, className, placeholderClassName }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const containerClasses = classNames(
        {
            "flex justify-center items-center text-white overflow-hidden relative": 1,
            "rounded-full": !square,
            "rounded-[15px]": square,
        },
        className
    );

    const placeholderProps = {
        height: "100%",
        width: "100%",
        borderRadius: square ? 15 : undefined,
        circle: square ? false : true,
        className: placeholderClassName,
    };

    return (
        <div className={containerClasses} style={{ width, height }}>
            {picture && (
                <motion.div animate={{ opacity: isLoaded ? 1 : 0 }}>
                    <Image
                        id={title + "id"}
                        src={picture}
                        alt={title}
                        style={{ objectFit: "cover" }}
                        quality={50}
                        onLoadingComplete={() => setIsLoaded(true)}
                        fill
                    />
                </motion.div>
            )}
            <AnimatePresence>{!isLoaded && <Placeholder {...placeholderProps} />}</AnimatePresence>
        </div>
    );
};

export default Avatar;
