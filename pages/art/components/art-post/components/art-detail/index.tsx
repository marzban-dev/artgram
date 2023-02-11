import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useState } from "react";
import { IArtDetailProps } from "./art-detail.types";

const ArtDetail: React.FC<IArtDetailProps> = ({ id, icon: Icon, text, iconSize }) => {
    const [show, setShow] = useState(false);

    const onMouseEnter = () => {
        const artPictureContainer = document.querySelector(`#art-${id}`) as HTMLDivElement;
        artPictureContainer.style.filter = "brightness(0.4)";
        setShow(true);
    };

    const onMouseLeave = () => {
        const artPictureContainer = document.querySelector(`#art-${id}`) as HTMLDivElement;
        artPictureContainer.style.filter = "brightness(0.85)";
        setShow(false);
    };

    return (
        <div
            className="relative shadow-lg shadow-[rgba(0,0,0,0.5)] rounded-full"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            data-testid="art-detail-container"
        >
            <div className="w-[30px] h-[30px] bg-[rgba(35,35,35,1)] rounded-full flex justify-center items-center z-10 relative">
                <Icon
                    className="fill-[rgba(200,200,200,1)]"
                    style={{
                        width: iconSize + "px",
                    }}
                />
            </div>
            <AnimatePresence>
                {show && (
                    <motion.div
                        className="rounded-full bg-[rgba(20,20,20,1)] absolute whitespace-nowrap top-0 h-full text-[rgba(185,185,185,1)] pl-[40px] pr-4 flex justify-center items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        data-testid="art-detail-text"
                    >
                        {text}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ArtDetail;
