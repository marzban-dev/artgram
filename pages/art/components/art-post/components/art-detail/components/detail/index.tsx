import { useEffect, useRef, useState } from "react";
import { IDetailProps } from "./detail.types";
import { motion, Variants } from "framer-motion";
import { toast } from "react-hot-toast";
import TextOverflowAnimation from "components/text-overflow-animation";

const Detail: React.FC<IDetailProps> = ({ icon: Icon, text, title }) => {
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

    return (
        <div className="flex w-full items-center justify-start gap-2 rounded-[30px] pr-3">
            <button
                className="flex items-center justify-center gap-2 whitespace-nowrap rounded-[30px] border-2 border-transparent bg-[rgb(30,30,30)] px-2 py-[2px] transition-colors hover:border-art-lighter min-[460px]:px-3 min-[460px]:py-1"
                onClick={onTitleClicked}
            >
                <Icon className="h-[16px] fill-art-primary" />
                <span className="text-[15px] text-art-primary min-[460px]:text-[16px]">{title}</span>
            </button>
            <TextOverflowAnimation className="px-2 text-[15px] text-[rgba(200,200,200,1)] min-[460px]:text-[16px]">
                {text}
            </TextOverflowAnimation>
        </div>
    );
};
export default Detail;
