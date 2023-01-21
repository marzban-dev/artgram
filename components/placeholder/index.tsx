import { motion } from "framer-motion";

const Placeholder: React.FC = () => {
    return (
        <motion.div
            className="absolute w-full backdrop-brightness-125 bg-[rgba(50,50,50,0.5)] border-2 border-[rgba(150,150,150,0.1)] rounded-[25px] z-50 h-full"
            initial={false}
            exit={{ opacity: 0 }}
            data-testid="loading-overlay"
        />
    );
};

export default Placeholder;
