import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
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
            }, 6000);
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
        return [
            "https://www.wga.hu/art/l/leonardo/03/4lastsu1.jpg",
            "https://www.wga.hu/art/g/gogh_van/09/arles41.jpg",
            "https://www.wga.hu/art/m/michelan/3sistina/4ceilin2.jpg",
        ].map((img, i) => {
            return (
                <motion.div
                    className="absolute h-[150%] w-full"
                    variants={sliderVariants}
                    initial="init"
                    animate={i + 1 === activeSlide ? "show" : "hide"}
                    key={i}
                >
                    <Image
                        src={img}
                        alt="background"
                        className="brightness-[0.7]"
                        style={{ objectFit: "cover" }}
                        priority
                        fill
                    />
                </motion.div>
            );
        });
    };

    return (
        <div className="absolute flex h-full w-full items-end justify-center">
            <div className="absolute z-20 h-full w-full bg-explore-search-gradient" />
            {renderSlides()}
        </div>
    );
};

export default Background;
