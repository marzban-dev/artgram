import { motion, useAnimation, Variants } from "framer-motion";
import DownloadIcon from "public/assets/icon/arrow-down-to-line.svg";
import { MouseEvent } from "react";
import downloadFile from "utils/download-file";
import { IDownloadButtonProps } from "./download-props.types";

const DownloadButton: React.FC<IDownloadButtonProps> = ({ id, name }) => {
    const animationControl = useAnimation();

    const onDownload = async (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        animationControl.start("move");
        const imageEl = document.getElementById(`art-${id}`) as HTMLImageElement;
        downloadFile(imageEl.src, name);
    };

    const iconVariants: Variants = {
        move: {
            opacity: [1, 0, 0, 1],
            y: [0, 10, -10, 0],
            scale: [1, 0.6, 1, 1],
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <button onClick={onDownload}>
            <motion.div variants={iconVariants} animate={animationControl}>
                <DownloadIcon className="h-[26px] fill-white" />
            </motion.div>
        </button>
    );
};
export default DownloadButton;
