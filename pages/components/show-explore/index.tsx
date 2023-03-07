import { IArt } from "apis/arts.types";
import InfiniteArts from "components/infinite-arts";
import Spinner from "components/spinner";
import { useExploreQuery } from "hooks/use-explore";
import { useSearchQuery } from "hooks/use-search";
import { useSelector } from "react-redux";
import { RootState } from "store";
import flatInfiniteQueryData from "utils/flat-infinite-query-data";

const ShowExplore: React.FC = () => {
    const { data: arts, fetchNextPage: fetchNextExplorePage } = useExploreQuery();

    const { data: searchResult } = useSearchQuery();
    const isSearching = useSelector((state: RootState) => state.explore.isSearching);

    if (arts && !searchResult && !isSearching) {
        return (
            <InfiniteArts
                arts={flatInfiniteQueryData<IArt>(arts!)}
                callback={fetchNextExplorePage}
                hasNextPage={true}
            />
        );
    } else {
        if (!arts) return <Spinner size={30} />;
        else return null;
    }
};

export default ShowExplore;
