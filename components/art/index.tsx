import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
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

    const goToArtPage = () => {
        queryClient.setQueryData(["art", id], () => artObject);
        router.push(`/art/${id}`, undefined, { shallow: true });
    };

    const imageWrapperClasses = classNames({
        "relative origin-top overflow-hidden rounded-[10px] min-[750px]:rounded-[15px] min-[1020px]:rounded-[25px] transition-all duration-700 ease-out": 1,
        "opacity-1 [transform:_rotateX(0deg)]": isImageInView,
        "opacity-0 [transform:_rotateX(-40deg)]": !isImageInView,
    });

    const wrapperClasses = classNames({
        "relative h-full w-full transition-opacity transition-opacity": 1,
        "opacity-1": isLoaded,
        "opacity-0": !isLoaded,
    });

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
                <motion.div id={`art-${id}`} className={imageWrapperClasses}>
                    <Placeholder isLoaded={isLoaded} />
                    <div className={wrapperClasses}>
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
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Art;
