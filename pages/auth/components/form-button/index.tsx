import { useState, useEffect } from "react";
import classNames from "classnames";
import { IFormButtonProps } from "./form-button.types";
import { AnimatePresence, motion, useAnimation, Variants } from "framer-motion";
import CheckIcon from "public/assets/icon/circle-check.svg";
import XIcon from "public/assets/icon/circle-xmark.svg";

const FormButton: React.FC<IFormButtonProps> = ({ formState, disabled, children }) => {
    const animationControls = useAnimation();

    useEffect(() => {
        if (formState === "success") animationControls.start("show");
        if (formState === "error") animationControls.start("show-and-hide");
    }, [formState]);

    const buttonClasses = classNames({
        "relative overflow-hidden w-full h-[50px] rounded-[18px] mt-4 text-white font-semibold form-submit-button bg-form-background-primary hover:bg-form-background-lighter transition-colors flex justify-center items-center": 1,
    });

    const overlayClasses = classNames({
        "absolute w-[500px] h-[500px] rounded-full flex justify-center items-center scale-0": 1,
        "bg-red-500": formState === "error",
        "bg-green-500": formState === "success",
    });

    const overlayIconClasses = classNames({
        "w-[25px]": 1,
        "fill-red-100": formState === "error",
        "fill-green-100": formState === "success",
    });

    const overlayVariants: Variants = {
        "show-and-hide": {
            scale: [0, 1, 1, 1, 1, 1, 1, 0],
            transition: { duration: 2 },
        },
        show: {
            scale: [0, 1],
            transition: { duration: 0.5 },
        },
    };

    const overlayIconVariants: Variants = {
        "show-and-hide": { opacity: 1, transition: { duration: 0.2 } },
        show: { opacity: 1, transition: { duration: 0.2 } },
    };

    return (
        <button type="submit" className={buttonClasses} disabled={disabled}>
            <motion.div
                variants={overlayVariants}
                animate={animationControls}
                className={overlayClasses}
            >
                <motion.div variants={overlayIconVariants}>
                    {formState === "success" && <CheckIcon className={overlayIconClasses} />}
                    {formState === "error" && <XIcon className={overlayIconClasses} />}
                </motion.div>
            </motion.div>

            <AnimatePresence initial={false}>
                {formState === "loading" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.div
                            animate={{ rotateZ: [0, 360] }}
                            transition={{
                                ease: "linear",
                                duration: 0.8,
                                repeat: Infinity,
                                repeatType: "loop",
                            }}
                        >
                            <SpinnerIcon className="fill-white w-[30px]" />
                        </motion.div>
                    </motion.div>
                )}
                {formState === "idle" && <motion.div>{children}</motion.div>}
            </AnimatePresence>
        </button>
    );
};

export default FormButton;
