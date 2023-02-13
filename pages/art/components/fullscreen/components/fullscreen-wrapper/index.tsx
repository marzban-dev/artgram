import Spinner from "components/spinner";
import { motion, useSpring, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import SampleArt from "public/assets/img/arts/18.jpg";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setFullscreenArt } from "store/slice/app.slice";
import { IFullscreenWrapperProps } from "./fullscreen-wrapper.types";

const FullscreenWrapper: React.FC<IFullscreenWrapperProps> = ({ fullscreenArt }) => {
    const dispatch = useDispatch();
    const artPostContainer = useRef<HTMLDivElement | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [containerWidth, setContainerWidth] = useState(1);
    const [containerHeight, setContainerHeight] = useState(1);

    const mouseX = useSpring(0, { stiffness: 400, damping: 100 });
    const transformedMouseX = useTransform(mouseX, [0, containerWidth], [-10, 10]);

    const mouseY = useSpring(0, { stiffness: 400, damping: 100 });
    const transformedMouseY = useTransform(mouseY, [0, containerHeight], [8, -8]);

    /**
     * Set art rotation to center.
     * Set container width and height in state.
     */
    useEffect(() => {
        const wrapperWidth = artPostContainer.current?.clientWidth!;
        const wrapperHeight = artPostContainer.current?.clientHeight!;

        mouseX.set(wrapperWidth / 2);
        mouseY.set(wrapperHeight / 2);

        setContainerWidth(wrapperWidth);
        setContainerHeight(wrapperHeight);
    }, []);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    const exitFullscreen = () => {
        dispatch(setFullscreenArt(null));
    };

    const containerVariants: Variants = {
        hide: {
            opacity: 0,
        },
        show: {
            opacity: 1,
        },
    };

    const wrapperVariants: Variants = {
        hide: {
            opacity: 0,
            rotateX: 20,
            y: 200,
            transition: {
                duration: 0.4,
                opacity: {
                    duration: 0.2,
                },
            },
        },
        exit: {
            opacity: 0,
            y: 100,
            transition: {
                duration: 0.4,
                opacity: {
                    duration: 0.2,
                },
            },
        },
        show: {
            opacity: 1,
            rotateX: 0,
            y: 0,
            transition: {
                duration: 0.4,
                rotateX: { type: "spring", stiffness: 200, damping: 30 },
                y: { type: "spring", stiffness: 200, damping: 30 },
                opacity: {
                    duration: 0.2,
                },
            },
        },
    };

    return (
        <motion.div
            className="fixed z-[100] top-0 left-0 w-full h-full bg-[rgb(0,0,0)] [perspective:1000px] cursor-pointer"
            ref={artPostContainer}
            onClick={exitFullscreen}
            onMouseMove={handleMouseMove}
            variants={containerVariants}
            initial="hide"
            animate="show"
            exit="hide"
            title="Exit fullscreen"
        >
            <motion.div
                className="w-full h-full flex justify-center items-center [perspective:1000px]"
                variants={wrapperVariants}
                initial="hide"
                animate="show"
                exit="exit"
            >
                <motion.div
                    className="w-full h-full max-h-[90vh] max-w-[90vw] relative"
                    style={{
                        rotateY: transformedMouseX,
                        rotateX: transformedMouseY,
                    }}
                >
                    <motion.div
                        animate={{ opacity: isLoaded ? 0 : 1 }}
                        className="fixed w-full h-full bg-black left-0 top-0 flex justify-center items-center flex-col z-[1000] gap-4"
                    >
                        <Spinner size={50} />
                        <span className="text-white text-[18px]">Fullscreen Loading</span>
                    </motion.div>
                    <Image
                        src={fullscreenArt.picture}
                        alt={fullscreenArt.title}
                        quality={100}
                        className="rounded-[25px]"
                        style={{ objectFit: "contain" }}
                        onLoadingComplete={() => setIsLoaded(true)}
                        priority
                        fill
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default FullscreenWrapper;
