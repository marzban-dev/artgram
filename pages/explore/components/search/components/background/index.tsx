import { AnimatePresence, motion, useScroll, useSpring, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import Test3Image from "public/assets/img/arts/12.jpg";
import Test5Image from "public/assets/img/arts/16.jpg";
import Test1Image from "public/assets/img/arts/21.jpg";
import { useEffect, useRef, useState } from "react";

const Background: React.FC = () => {
    const [activeSlide, setActiveSlide] = useState(1);
    const activeSlideRef = useRef(1);
    const sliderInterval = useRef<NodeJS.Timer | null>(null);
    // const { scrollY } = useScroll();
    // const scrollYTransform = useTransform(scrollY, [0, 1000], [-50, 50]);
    // const scrollYSpring = useSpring(scrollYTransform, {
    //     stiffness : 200,
    //     damping : 80
    // });

    useEffect(() => {
        if (!sliderInterval.current) {
            sliderInterval.current = setInterval(() => {
                if (activeSlideRef.current >= 3) {
                    activeSlideRef.current = 1;
                    setActiveSlide(1);
                } else {
                    activeSlideRef.current = activeSlideRef.current + 1;
                    setActiveSlide((prev) => prev + 1);
                }
            }, 10000);
        }
    }, []);

    const sliderVariants: Variants = {
        init: {
            scale: 1.3,
            opacity: 0,
        },
        show: {
            scale: 1,
            opacity: 1,
            transition: {
                scale: {
                    duration: 0.3,
                },
                opacity: {
                    duration: 0.2,
                },
            },
        },
        hide: {
            scale: 0.9,
            opacity: 0,
            transition: {
                scale: {
                    duration: 0.2,
                },
                opacity: {
                    duration: 0.15,
                },
            },
        },
    };

    const renderSlides = () => {
        return [Test1Image, Test3Image, Test5Image].map((img, i) => {
            if (i + 1 === activeSlide) {
                return (
                    <motion.div
                        // style={{ y: scrollYSpring }}
                        className="w-full h-[150%] relative"
                        variants={sliderVariants}
                        initial="init"
                        animate="show"
                        exit="hide"
                        key={i}
                    >
                        <Image
                            src={img}
                            alt="background"
                            className="brightness-[0.5]"
                            style={{ objectFit: "cover" }}
                            quality={40}
                            priority
                            fill
                        />
                    </motion.div>
                );
            }
        });
    };

    return (
        <div className="w-full h-full absolute">
            <div className="w-full h-full bg-explore-search-gradient absolute z-20" />
            <AnimatePresence mode="popLayout">{renderSlides()}</AnimatePresence>
        </div>
    );
};

export default Background;
