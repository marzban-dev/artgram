import { Portal } from "components/portal";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { IModalProps } from "./modal.types";

const Modal: React.FC<IModalProps> = ({ show, onClose, children }) => {
    const overlayVariants: Variants = {
        hide: {
            opacity: 0,
            transition: {
                duration: 0.25,
            },
        },
        show: {
            opacity: 1,
            transition: {
                duration: 0.25,
            },
        },
    };

    const contentVariants: Variants = {
        hide: {
            opacity: 0,
            rotateX: 15,
            y: 35,
            transition: {
                duration: 0.2,
            },
        },
        show: {
            opacity: 1,
            rotateX: 0,
            y: 0,
            transition: {
                duration: 0.2,
                rotateX: { type: "spring", stiffness: 200, damping: 30 },
                y: { type: "spring", stiffness: 200, damping: 30 },
            },
        },
    };

    return (
        <Portal>
            <AnimatePresence>
                {show && (
                    <div className="z-[999] fixed top-0 flex justify-center items-center w-full h-full [perspective:1000px]">
                        <motion.div
                            variants={contentVariants}
                            initial="hide"
                            animate="show"
                            exit="hide"
                            className="z-[1000] min-w-[250px] mx-5 rounded-3xl bg-white absolute origin-bottom"
                        >
                            {children}
                        </motion.div>
                        <motion.div
                            variants={overlayVariants}
                            initial="hide"
                            animate="show"
                            exit="hide"
                            className="z-[999] bg-[rgba(0,0,0,0.9)] w-full h-full cursor-pointer absolute"
                            onClick={onClose}
                            title="Click To Close"
                        ></motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Portal>
    );
};

export default Modal;
