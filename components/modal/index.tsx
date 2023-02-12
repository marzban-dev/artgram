import { Portal } from "components/portal";
import { AnimatePresence, motion, PanInfo, Variants } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { IModalProps } from "./modal.types";

const Modal: React.FC<IModalProps> = ({ show, onClose, children }) => {
    const isMobile = useMediaQuery({ maxWidth: 520 });

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

    const contentDesktopVariants: Variants = {
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

    const contentMobileVariants: Variants = {
        hide: {
            y: "100%",
            transition: {
                duration: 0.2,
            },
        },
        show: {
            y: 0,
            transition: {
                y: { type: "spring", stiffness: 350, damping: 40 },
            },
        },
    };

    const onDragEnd = (e: any, info: PanInfo) => {
        if (info.offset.y > 40) onClose();
    };

    return (
        <Portal>
            <AnimatePresence>
                {show && (
                    <div className="z-[999] fixed top-0 flex justify-center items-center w-full h-full [perspective:1000px]">
                        <motion.div
                            variants={isMobile ? contentMobileVariants : contentDesktopVariants}
                            initial="hide"
                            animate="show"
                            exit="hide"
                            className="z-[1000] min-h-[250px] max-h-[500px] w-full min-[520px]:w-[500px] rounded-t-[20px] rounded-b-none min-[520px]:rounded-[20px] bg-[rgb(20,20,20)] absolute max-[520px]:bottom-0 origin-bottom"
                            drag="y"
                            dragConstraints={{ bottom: 0, top: 0 }}
                            dragElastic={{ bottom: 0.4, top: 0.01 }}
                            dragTransition={{ bounceStiffness: 200, bounceDamping: 25 }}
                            // onDragStart={onMessageDragStart}
                            onDragEnd={onDragEnd}
                            // onUpdate={onMotionUpdate}
                        >
                            <div className="w-full hidden max-[520px]:flex justify-center items-center py-3 cursor-grab">
                                <div className="w-[70px] h-[6px] rounded-[5px] bg-[rgb(40,40,40)]" />
                            </div>
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
