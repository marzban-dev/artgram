import React, { useState } from "react";
import { IDescriptionProps } from "./description.types";

const Description: React.FC<IDescriptionProps> = ({ text }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bottom-[25px] overflow-hidden relative">
            <p
                className="text-[rgb(200,200,200)] px-[40px] [line-height:1.8]"
                dangerouslySetInnerHTML={{ __html: text }}
            />
        </div>
    );
};
export default Description;
