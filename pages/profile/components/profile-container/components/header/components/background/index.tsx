import Placeholder from "components/placeholder";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { memo, useState } from "react";
import { IBackgroundProps } from "./background.types";
import ActionButtons from "./components/action-buttons";

const Background: React.FC<IBackgroundProps> = ({ username, background }) => {
    const [isLoaded, setIsLoaded] = useState(true);

    return (
        <div className="w-full h-[170px] min-[661px]:h-[200px] min-[661px]:rounded-[15px] overflow-hidden bg-[rgb(22,22,22)]">
            <AnimatePresence>
                {!isLoaded && (
                    <Placeholder
                        width="100%"
                        height="100%"
                        className="border border-[rgb(40,40,40)] min-[661px]:rounded-[15px]"
                    />
                )}
            </AnimatePresence>
            <motion.div animate={{ opacity: isLoaded ? 1 : 0 }} className="relative w-full h-full">
                <ActionButtons username={username} />
                <div className="w-full h-full absolute bg-profile-background-gradient z-20" />
                <Image
                    id="artist-background"
                    src={background ? background : "https://artgram.iran.liara.run/media/header.jpg"}
                    style={{ objectFit: "cover" }}
                    onLoadingComplete={() => setIsLoaded(true)}
                    alt="background"
                    quality={100}
                    fill
                />
            </motion.div>
        </div>
    );
};

export default memo(Background);
