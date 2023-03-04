import { useEffect, useRef, useState } from "react";
import { IDetailProps } from "./detail.types";
import { motion, Variants } from "framer-motion";
import { toast } from "react-hot-toast";

const Detail: React.FC<IDetailProps> = ({ icon: Icon, text, title }) => {
    const textRef = useRef<HTMLDivElement>(null);

    const [overflowAmount, setOverflowAmount] = useState(0);

    useEffect(() => {
        const textScrollWidth = textRef.current!.scrollWidth;
        const textWidth = textRef.current!.clientWidth;

        if (textWidth < textScrollWidth) {
            setOverflowAmount(textScrollWidth - textWidth + 20);
        }
    }, []);

    const onTitleClicked = async () => {
        toast.dismiss();
        try {
            await navigator.clipboard.writeText(text);
            toast(
                <div>
                    <span className="text-green-400">{title}</span> copied
                </div>
            );
        } catch (e) {
            toast(
                <div>
                    <span className="text-red-400">{title}</span> could not copy
                </div>
            );
        }
    };

    const textVariants: Variants = {
        scroll: {
            x: [0, -overflowAmount],
            transition: {
                duration: 2,
                repeat: Infinity,
                repeatDelay: 2,
                repeatType: "mirror",
            },
        },
    };

    return (
        <div className="flex justify-start items-center gap-2 rounded-[30px] pr-3 w-full">
            <button
                className="flex justify-center items-center gap-2 bg-[rgb(30,30,30)] fill-art-primary text-art-primary rounded-[30px] px-3 py-1 whitespace-nowrap border-2 border-transparent hover:border-art-lighter transition-colors"
                onClick={onTitleClicked}
            >
                <Icon className="h-[16px]" />
                {title}
            </button>
            <div className="overflow-hidden relative">
                <div className="bg-gradient-to-l from-[rgb(20,20,20)] to-transparent w-[10px] h-full absolute top-0 right-0 z-20" />
                <motion.div
                    variants={textVariants}
                    animate="scroll"
                    className="text-[rgba(200,200,200,1)] whitespace-nowrap px-2"
                    ref={textRef}
                >
                    {text}
                </motion.div>
                <div className="bg-gradient-to-r from-[rgb(20,20,20)] to-transparent w-[10px] h-full absolute top-0 left-0 z-20" />
            </div>
        </div>
    );
};
export default Detail;
