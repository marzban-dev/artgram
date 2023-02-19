import Likes from "components/likes";
import { useArtLikesQuery } from "hooks/use-art-likes";
import React, { Fragment, useState } from "react";
import { ILikesCountProps } from "./likes-count.types";

const LikesCount: React.FC<ILikesCountProps> = ({ id, initial }) => {
    const [show, setShow] = useState(false);

    const { data } = useArtLikesQuery(id, initial);
    const count = data!.pages.at(-1)!.count;

    const containerStyle: React.CSSProperties = {
        opacity: count !== 0 ? 1 : 0,
    };

    return (
        <Fragment>
            <div
                className="text-[16px] text-[rgb(150,150,150)] font-semibold cursor-pointer"
                style={containerStyle}
                onClick={() => setShow(true)}
            >
                <span className="mr-[6px] text-white">{count}</span>
                <span>Likes</span>
            </div>
            <Likes id={id} initialData={initial} show={show} setShow={setShow} />
        </Fragment>
    );
};
export default LikesCount;
