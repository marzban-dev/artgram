import Like from "components/like";
import Placeholder from "components/placeholder";
import { AnimatePresence, motion, useInView, Variants } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { IArtProps } from "./art.types";

const Art: React.FC<IArtProps> = ({ id, picture, title, likes_count, user_like }) => {
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLiked, setIsLiked] = useState(user_like);
    const [showActions, setShowActions] = useState(isLiked);
    const [imageHeight, setImageHeight] = useState(0);

    const imageContainerRef = useRef<HTMLElement | null>(null);
    const imagePictureRef = useRef<HTMLImageElement | null>(null);
    const isImageInView = useInView(imageContainerRef, { once: true });

    useEffect(() => {
        const imageElement = imagePictureRef.current!;

        const parentWidth = imageContainerRef.current!.clientWidth;
        const imageAspectRatio = imageElement.naturalHeight / imageElement.naturalWidth;
        console.log(imageElement.naturalHeight);
        setImageHeight(parentWidth * imageAspectRatio);
    }, []);

    const imageVariants: Variants = {
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

    const actionsVariants: Variants = {
        hide: {
            opacity: 0,
            scale: 0.9,
            transition: {
                duration: 0.3,
                opacity: {
                    duration: 0.2,
                },
            },
        },
        show: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <section
            className="grid-item p-3 cursor-pointer"
            onClick={() => router.push(`/art/${id}`)}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => !isLiked && setShowActions(false)}
            ref={imageContainerRef}
            data-testid="container"
        >
            <div className="origin-center [perspective:1000px] rounded-[25px] brightness-[0.85] duration-200">
                <motion.div
                    id={`art-${id}`}
                    initial="hide"
                    variants={imageVariants}
                    animate={isImageInView ? "show" : "hide"}
                    className="rounded-[25px] overflow-hidden origin-top"
                >
                    <AnimatePresence>{!isLoaded && <Placeholder width="100%" height={imageHeight} />}</AnimatePresence>

                    <motion.div
                        animate={{ opacity: isLoaded ? 1 : 0 }}
                        className="rounded-[25px] overflow-hidden relative w-full h-full"
                    >
                        <motion.div
                            animate={{ opacity: showActions ? 1 : 0, scale: 1 }}
                            transition={{duration : 0.2}}
                            className="h-full w-full bg-art-like-button-gradient absolute bottom-0 right-0"
                        />
                        <motion.div
                            variants={actionsVariants}
                            animate={showActions ? "show" : "hide"}
                            className="absolute bottom-[10px] right-[20px]"
                        >
                            <Like
                                id={id}
                                initial={user_like}
                                onLikeCallback={() => setIsLiked(true)}
                                onDislikeCallback={() => setIsLiked(false)}
                            />
                        </motion.div>
                        <Image
                            ref={imagePictureRef}
                            onLoadingComplete={() => setIsLoaded(true)}
                            src={picture}
                            quality={25}
                            alt={title}
                            title={title}
                            width={400}
                            height={700}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
export default Art;
