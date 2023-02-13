import Art from "components/art";
import MasonryGrid from "components/masonry-grid";
import Spinner from "components/spinner";
import React, { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IInfiniteArtsProps } from "./infinite-arts.types";

const InfiniteArts: React.FC<IInfiniteArtsProps> = ({ arts, count, callback, className }) => {
    const renderArts = useMemo(() => {
        return arts.map((art) => <Art {...art} key={art.id} />);
    }, [arts]);

    const hasMoreArts = useMemo(() => {
        const fetchedArtsCount = arts.length;
        return fetchedArtsCount < count;
    }, [arts]);

    return (
        <div className={className}>
            {arts && (
                <InfiniteScroll
                    dataLength={arts.length}
                    next={callback}
                    hasMore={hasMoreArts}
                    loader={<Spinner size={40} style={{ padding: "50px 0" }} />}
                    style={{overflowY : "hidden"}}
                >
                    <MasonryGrid>{renderArts}</MasonryGrid>
                </InfiniteScroll>
            )}
        </div>
    );
};
export default InfiniteArts;
