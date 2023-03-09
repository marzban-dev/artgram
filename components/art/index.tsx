import { useQueryClient } from "@tanstack/react-query";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Cookies from "universal-cookie";
import { IArtProps } from "./art.types";
import ActionOverlay from "./components/action-overlay";
import Placeholder from "./components/placeholder";

const Art: React.FC<IArtProps> = ({ id, image, title, user_like, artObject }) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLiked, setIsLiked] = useState(user_like);
    const [showActions, setShowActions] = useState(isLiked);
    const isMobile = useMediaQuery({ maxWidth: 500 });

    useEffect(() => {
        if (isMobile) setShowActions(true);
        else setShowActions(isLiked);
    }, [isMobile]);

    const imageContainerRef = useRef<HTMLElement | null>(null);
    const isImageInView = useInView(imageContainerRef, { once: true });

    const goToArtPage = () => router.push(`/art/${id}`);

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
            className="grid-item cursor-pointer p-[6px] min-[550px]:p-2 min-[1020px]:p-3"
            onClick={goToArtPage}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => !isLiked && setShowActions(false)}
            ref={imageContainerRef}
            data-testid="container"
        >
            <div className="origin-center brightness-[0.85] duration-200 [perspective:1000px]">
                <motion.div
                    id={`art-${id}`}
                    initial="hide"
                    variants={imageWrapperVariants}
                    animate={isImageInView ? "show" : "hide"}
                    className="relative origin-top overflow-hidden rounded-[10px] min-[750px]:rounded-[15px] min-[1020px]:rounded-[25px]"
                >
                    <Placeholder isLoaded={isLoaded} />
                    <motion.div animate={{ opacity: isLoaded ? 1 : 0 }} className="relative h-full w-full">
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
