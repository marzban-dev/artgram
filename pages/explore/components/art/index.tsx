import Like from "components/like";
import Placeholder from "components/placeholder";
import { AnimatePresence, motion, useInView, Variants } from "framer-motion";
import { useArtLikes } from "hooks/use-art-likes";
import Image from "next/image";
import { useRouter } from "next/router";
import SampleArt from "public/assets/img/arts/13.jpg";
import React, { useRef, useState } from "react";
import { IArtProps } from "./art.types";

const Art: React.FC<IArtProps> = ({ id, title }) => {
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
    const [showActions, setShowActions] = useState(false);
    const imageContainerRef = useRef<HTMLElement | null>(null);
    const isImageInView = useInView(imageContainerRef, { once: true });
    const { data: likesCount } = useArtLikes(id);

    // useEffect(() => {
    //     if (isImageInView) setTimeout(() => setIsLoaded(true), randomNumber(1000, 5000));
    // }, [isImageInView]);

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
            y: 8,
            transition: {
                duration: 0.3,
                opacity: {
                    duration: 0.2,
                },
            },
        },
        show: {
            opacity: 1,
            y: 0,
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
            onMouseLeave={() => setShowActions(false)}
            ref={imageContainerRef}
            data-testid="container"
        >
            <div className="origin-center [perspective:1000px] rounded-[25px] brightness-[0.85] hover:brightness-100 transition-[filter] duration-200">
                <motion.div
                    id={`art-${id}`}
                    initial="hide"
                    variants={imageVariants}
                    animate={isImageInView ? "show" : "hide"}
                    className="relative w-full h-full rounded-[25px] overflow-hidden origin-top"
                >
                    <AnimatePresence>{!isLoaded && <Placeholder />}</AnimatePresence>

                    <motion.div animate={{ opacity: isLoaded ? 1 : 0 }} className="rounded-[25px] overflow-hidden relative">
                        <motion.div variants={actionsVariants} animate={showActions ? "show" : "hide"} className="rounded-[25px] absolute bottom-[10px] right-[20px]">
                            <Like id={id} />
                            {likesCount}
                        </motion.div>
                        <Image onLoadingComplete={() => setIsLoaded(true)} src={SampleArt} quality={25} alt={title} title={title} />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
export default Art;
