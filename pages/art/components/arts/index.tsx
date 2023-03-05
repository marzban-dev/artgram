import { useMemo } from "react";
import Spinner from "components/spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import ArtPost from "../art-post";
import { IArtsProps } from "./arts.types";
import { useArtsQuery } from "hooks/use-arts";
import flatInfiniteQueryData from "utils/flat-infinite-query-data";
import { IArt } from "api/arts.types";

const Arts: React.FC<IArtsProps> = ({ id, art, containerHeight }) => {
    const { data: arts, fetchNextPage } = useArtsQuery(id);

    const renderArts = useMemo(() => {
        if (arts) {
            return flatInfiniteQueryData<IArt>(arts).map((art) => {
                return <ArtPost {...art} key={art.id} />;
            });
        } else return null;
    }, [arts]);

    return (
        <InfiniteScroll
            className="w-full min-[520px]:pt-[25px] snap-y snap-proximity overflow-y-scroll max-[520px]:pt-[50px]"
            dataLength={arts ? arts.pages.flat().length : 1}
            next={fetchNextPage}
            hasMore={true}
            loader={<Spinner size={40} style={{ padding: "50px 0 100px 0" }} />}
            scrollThreshold={0.8}
            height={containerHeight}
        >
            {art && <ArtPost {...art} priority />}
            {renderArts}
        </InfiniteScroll>
    );
};

export default Arts;
