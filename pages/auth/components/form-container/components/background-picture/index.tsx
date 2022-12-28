import Image from "next/image";
import React, { useEffect, useState } from "react";
import BackgroundImage from "public/assets/img/test3.jpg";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const BackgroundPicture: React.FC = () => {
    const mouseX = useSpring(0, {
        stiffness: 100,
        damping: 100,
    });
    const mouseY = useSpring(0, {
        stiffness: 100,
        damping: 100,
    });
    const [windowWidth, setWindowWidth] = useState(1);
    const [windowHeight, setWindowHeight] = useState(1);
    const transformedMouseX = useTransform(mouseX, [0, windowWidth], [-25, 25]);
    const transformedMouseY = useTransform(mouseY, [0, windowHeight], [-5, 5]);

    const onMouseMove = (e: MouseEvent) => {
        mouseX.set(e.pageX);
        mouseY.set(e.pageY);
    };

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    return (
        <div className="w-full h-full absolute top-0 left-0 z-10 overflow-hidden">
            <motion.div
                className="w-full h-full absolute"
                style={{
                    x: transformedMouseX,
                    y: transformedMouseY,
                    scale: 1.1,
                }}
            >
                <Image
                    src={BackgroundImage}
                    alt="background"
                    style={{ objectFit: "cover" }}
                    id="form-background-image"
                    fill
                />
            </motion.div>
            <div className="bg-form-background-gradient w-1/2 h-full absolute top-0 right-0" />
            <div className="bg-black w-1/2 h-full absolute top-0 left-0" />
        </div>
    );
};
export default BackgroundPicture;
