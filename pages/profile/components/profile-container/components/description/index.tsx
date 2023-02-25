import { memo } from "react";
import classNames from "classnames";
import ArrowIcon from "public/assets/icon/caret-down.svg";
import { useEffect, useRef, useState } from "react";
import { IDescriptionProps } from "./description.types";

const Description: React.FC<IDescriptionProps> = ({ text }) => {
    const [showExpandButton, setShowExpandButton] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const paragraphRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        setShowExpandButton(paragraphRef.current!.scrollHeight > paragraphRef.current!.clientHeight);
    }, [text]);

    const paragraphClasses = classNames({
        "text-[rgb(200,200,200)] [line-height:1.8] overflow-ellipsis": 1,
        "line-clamp-4": !isExpanded,
        "line-clamp-unset": isExpanded,
    });

    const iconClasses = classNames({
        "h-[20px] fill-[rgb(120,120,120)] group-hover:fill-white transition-colors": 1,
        "rotate-180 mt-1": isExpanded,
        "mt-[3px]": !isExpanded,
    });

    return (
        <div className="px-[10px] min-[661px]:px-[25px] min-[950px]:px-[35px]">
            <p className={paragraphClasses} ref={paragraphRef}>
                {text}
            </p>
            {showExpandButton && (
                <div className="flex justify-center items-center">
                    <button
                        className="group border-2 border-[rgb(120,120,120)] hover:border-white rounded-[30px] py-1 px-6 text-[rgb(120,120,120)] hover:text-white mt-4 flex justify-center items-center gap-2 transition-colors"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? "Less" : "More"}
                        <ArrowIcon className={iconClasses} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default memo(Description);
