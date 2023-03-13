import { useState } from "react";
import Image from "next/image";
import TestPicture from "public/assets/img/arts/16.jpg";
import { IBackgroundProps } from "./background.types";
import { motion } from "framer-motion";

const Background: React.FC<IBackgroundProps> = ({ picture }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="fixed top-0 left-0 h-full w-full">
            <div className="fixed z-20 h-full w-full bg-art-post-background-gradient" />
            <motion.div animate={{ opacity: isLoaded ? 0 : 1 }} className="fixed z-10 h-full w-full bg-zinc-700" />

            <Image
                src={picture}
                alt="background"
                style={{ objectFit: "cover" }}
                onLoadingComplete={() => setIsLoaded(true)}
                priority
                fill
            />
        </div>
    );
};

export default Background;
