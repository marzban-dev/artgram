import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import Test3Image from "public/assets/img/arts/12.jpg";
import Test5Image from "public/assets/img/arts/16.jpg";
import Test1Image from "public/assets/img/arts/21.jpg";
import { useEffect, useRef, useState } from "react";

const Background: React.FC = () => {
    const [activeSlide, setActiveSlide] = useState(1);
    const activeSlideRef = useRef(1);
    const sliderInterval = useRef<NodeJS.Timer | null>(null);

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
            opacity: 0,
        },
        show: {
            opacity: 1,
            transition: {
                opacity: {
                    duration: 0.2,
                },
            },
        },
        hide: {
            opacity: 0,
            transition: {
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
                        className="relative h-[150%] w-full"
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
                            priority
                            fill
                        />
                    </motion.div>
                );
            }
        });
    };

    return (
        <div className="absolute h-full w-full">
            <div className="absolute z-20 h-full w-full bg-explore-search-gradient" />
            <AnimatePresence mode="popLayout">{renderSlides()}</AnimatePresence>
        </div>
    );
};

export default Background;
