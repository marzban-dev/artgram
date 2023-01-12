import { motion } from "framer-motion";
import SpinnerIcon from "public/assets/icon/spinner-third.svg";
import { ISpinnerProps } from "./spinner.types";

const Spinner: React.FC<ISpinnerProps> = ({ size = 30, style }) => {
    return (
        <div className="flex justify-center items-center overflow-hidden p-[2px]" style={style}>
            <motion.div
                animate={{ rotateZ: [0, 360] }}
                transition={{
                    ease: "linear",
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "loop",
                }}
            >
                <SpinnerIcon className="fill-white" style={{ width: size }} />
            </motion.div>
        </div>
    );
};

export default Spinner;
