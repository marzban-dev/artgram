import { motion } from "framer-motion";
import SpinnerIcon from "public/assets/icon/spinner-third.svg";
import { ISpinnerProps } from "./spinner.types";

const Spinner: React.FC<ISpinnerProps> = ({ size = 30, style }) => {
    return (
        <motion.div
            className="flex items-center justify-center overflow-hidden p-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={style}
        >
            <div className="animate-spin [animation-duration:0.5s]" data-testid="loading-icon">
                <SpinnerIcon className="fill-white" style={{ width: size }} />
            </div>
        </motion.div>
    );
};

export default Spinner;
