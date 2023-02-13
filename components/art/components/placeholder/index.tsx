import { AnimatePresence, motion } from "framer-motion";
import { IPlaceholderProps } from "./placeholder.types";

const Placeholder: React.FC<IPlaceholderProps> = ({ isLoaded }) => {
    return (
        <AnimatePresence>
            {!isLoaded && (
                <motion.div
                    initial={false}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full absolute bottom-0 bg-[rgb(20,20,20)] border-2 border-[rgb(40,40,40)] rounded-[25px]"
                />
            )}
        </AnimatePresence>
    );
};

export default Placeholder;
