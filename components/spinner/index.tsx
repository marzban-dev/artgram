import { motion } from "framer-motion";
import SpinnerIcon from "public/assets/icon/spinner-third.svg";
import { ISpinnerProps } from "./spinner.types";

const Spinner: React.FC<ISpinnerProps> = ({ size = 30, style }) => {
    return (
        <motion.div className="flex justify-center items-center overflow-hidden p-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={style}>
            <motion.div
                data-testid="loading-icon"
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
        </motion.div>
    );
};

export default Spinner;
