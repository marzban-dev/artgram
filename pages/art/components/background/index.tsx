import { useState } from "react";
import Image from "next/image";
import TestPicture from "public/assets/img/arts/16.jpg";
import { IBackgroundProps } from "./background.types";
import { motion } from "framer-motion";

const Background: React.FC<IBackgroundProps> = ({ picture }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="fixed top-0 left-0 w-full h-full">
            <div className="bg-art-post-background-gradient fixed w-full h-full z-20" />
            <motion.div animate={{ opacity: isLoaded ? 0 : 1 }} className="bg-zinc-700 fixed w-full h-full z-10" />

            <Image
                src={picture}
                alt="background"
                style={{ objectFit: "cover" }}
                onLoadingComplete={() => setIsLoaded(true)}
                fill
            />
        </div>
    );
};

export default Background;
