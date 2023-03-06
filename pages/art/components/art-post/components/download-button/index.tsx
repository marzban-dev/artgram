import { motion, useAnimation, Variants } from "framer-motion";
import DownloadIcon from "public/assets/icon/arrow-down-to-line.svg";
import { MouseEvent } from "react";
import downloadFile from "utils/download-file";
import { IDownloadButtonProps } from "./download-props.types";

const DownloadButton: React.FC<IDownloadButtonProps> = ({ name, href }) => {
    const animationControl = useAnimation();

    const onDownload = async (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        animationControl.start("move");
        console.log(href);
        downloadFile(href, "x.jpg");
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
                <DownloadIcon className="fill-white h-[26px]" />
            </motion.div>
        </button>
    );
};
export default DownloadButton;
