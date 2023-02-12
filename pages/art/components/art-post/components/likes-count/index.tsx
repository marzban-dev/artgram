import React, { useState,useEffect } from "react";
import { useArtLikesQuery } from "hooks/use-art-likes";
import { ILikesCountProps } from "./likes-count.types";
import Likes from "components/likes";

const LikesCount: React.FC<ILikesCountProps> = ({ id, initial }) => {
    const [show, setShow] = useState(false);

    const {
        data: { likesCount },
    } = useArtLikesQuery(id, initial);

    const containerStyle: React.CSSProperties = {
        opacity: likesCount !== 0 ? 1 : 0,
    };

    useEffect(() => {
        console.log("re render")
    });

    return (
        <div
            className="text-[16px] text-[rgb(150,150,150)] font-semibold cursor-pointer"
            style={containerStyle}
            onClick={() => setShow(true)}
        >
            <span className="mr-[6px] text-white">{likesCount}</span>
            <span>Likes</span>
            <Likes id={id} initialData={initial} show={show} setShow={setShow} />
        </div>
    );
};
export default LikesCount;
