import Placeholder from "components/placeholder";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { memo, useState } from "react";
import { IBackgroundProps } from "./background.types";

const Background: React.FC<IBackgroundProps> = ({ background }) => {
    const [isLoaded, setIsLoaded] = useState(true);

    return (
        <div className="w-full h-[150px] rounded-[10px] overflow-hidden bg-[rgb(22,22,22)]">
            <AnimatePresence>
                {!isLoaded && (
                    <Placeholder width="100%" height="100%" className="border border-[rgb(40,40,40)] rounded-[15px]" />
                )}
            </AnimatePresence>
            <motion.div animate={{ opacity: isLoaded ? 1 : 0 }} className="relative w-full h-full">
                <div className="w-full h-full bg-gradient-to-t from-[rgb(10,10,10)] to-transparent absolute z-20" />
                <Image
                    id="artist-background"
                    src={background ? background : "https://artgram.iran.liara.run/media/header.jpg"}
                    style={{ objectFit: "cover" }}
                    onLoadingComplete={() => setIsLoaded(true)}
                    alt="background"
                    fill
                />
            </motion.div>
        </div>
    );
};

export default memo(Background);
