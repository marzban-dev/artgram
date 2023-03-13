import Likes from "components/likes";
import { useInView } from "framer-motion";
import { useCountQuery } from "hooks/use-count";
import React, { Fragment, useRef, useState } from "react";
import { ILikesCountProps } from "./likes-count.types";

const LikesCount: React.FC<ILikesCountProps> = ({ id, initial }) => {
    const [show, setShow] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef);
    const { data: count } = useCountQuery(["art-likes", id], initial, { id }, isInView);

    return count !== 0 ? (
        <Fragment>
            <div
                className="cursor-pointer text-[16px] font-semibold text-[rgb(150,150,150)]"
                onClick={() => setShow(true)}
                ref={containerRef}
            >
                <span className="mr-[6px] text-white">{count}</span>
                <span>Likes</span>
            </div>
            <Likes id={id} show={show} setShow={setShow} />{" "}
        </Fragment>
    ) : null;
};
export default LikesCount;
