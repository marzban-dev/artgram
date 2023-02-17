import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { IArtProps } from "./art.types";
import ActionOverlay from "./components/action-overlay";
import Placeholder from "./components/placeholder";

const Art: React.FC<IArtProps> = ({ id, image, title, user_like }) => {
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLiked, setIsLiked] = useState(user_like);
    const [showActions, setShowActions] = useState(isLiked);

    const imageContainerRef = useRef<HTMLElement | null>(null);
    const isImageInView = useInView(imageContainerRef, { once: true });

    const imageWrapperVariants: Variants = {
        hide: {
            opacity: 0,
            rotateX: -40,
        },
        show: {
            opacity: 1,
            rotateX: 0,
            transition: {
                delay: 0.1,
                type: "spring",
                stiffness: 200,
                damping: 40,
            },
        },
    };

    return (
        <section
            className="grid-item p-[6px] min-[550px]:p-2 min-[1020px]:p-3 cursor-pointer"
            onClick={() => router.push(`/art/${id}`)}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => !isLiked && setShowActions(false)}
            ref={imageContainerRef}
            data-testid="container"
        >
            <div className="origin-center [perspective:1000px] rounded-[10px] min-[750px]:rounded-[15px] min-[1020px]:rounded-[25px] overflow-hidden brightness-[0.85] duration-200">
                <motion.div
                    id={`art-${id}`}
                    initial="hide"
                    variants={imageWrapperVariants}
                    animate={isImageInView ? "show" : "hide"}
                    className="origin-top relative"
                >
                    <Placeholder isLoaded={isLoaded} />
                    <motion.div
                        animate={{ opacity: isLoaded ? 1 : 0 }}
                        className="relative w-full h-full"
                    >
                        <ActionOverlay
                            id={id}
                            showActions={showActions}
                            setIsLiked={setIsLiked}
                            user_like={user_like}
                        />
                        <Image
                            onLoadingComplete={() => setIsLoaded(true)}
                            src={image.url}
                            quality={50}
                            alt={title}
                            title={title}
                            width={image.width}
                            height={image.height}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Art;
