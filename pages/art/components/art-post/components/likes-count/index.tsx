import React, { useMemo } from "react";
import { ILikesCountProps } from "./likes-count.types";

const LikesCount: React.FC<ILikesCountProps> = ({ count }) => {
    const formatCount = useMemo(() => {}, [count]);

    return (
        <div className="text-[16px]">
            <span className="text-[rgba(200,200,200,1)] font-semibold">{count} </span>
            <span className="text-white font-semibold">Likes</span>
        </div>
    );
};
export default LikesCount;
