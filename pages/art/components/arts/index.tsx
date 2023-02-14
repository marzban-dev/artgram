import { useMemo } from "react";
import Spinner from "components/spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import ArtPost from "../art-post";
import { IArtsProps } from "./arts.types";
import { useArtsQuery } from "hooks/use-arts";

const Arts: React.FC<IArtsProps> = ({ id, art, containerHeight }) => {
    const { data: arts, fetchNextPage } = useArtsQuery(id);

    console.log(containerHeight);

    const renderArts = useMemo(() => {
        return arts?.pages.flat().map((art) => {
            return <ArtPost {...art} key={art.id} />;
        });
    }, [arts]);

    return (
        <InfiniteScroll
            className="w-full pt-[25px] snap-y snap-proximity overflow-y-scroll"
            dataLength={arts ? arts.pages.flat().length : 1}
            next={fetchNextPage}
            hasMore={true}
            loader={<Spinner size={40} style={{ padding: "50px 0" }} />}
            scrollThreshold={0.9}
            height={containerHeight}
        >
            {art && <ArtPost {...art} priority />}
            {renderArts}
        </InfiniteScroll>
    );
};

export default Arts;