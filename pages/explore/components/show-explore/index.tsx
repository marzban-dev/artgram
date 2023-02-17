import InfiniteArts from "components/infinite-arts";
import { useExploreQuery } from "hooks/use-explore";
import { useSearchQuery } from "hooks/use-search";
import { useSelector } from "react-redux";
import { RootState } from "store";

const ShowExplore: React.FC = () => {
    const { data: arts, fetchNextPage: fetchNextExplorePage } = useExploreQuery();

    const { data: searchResult } = useSearchQuery();
    const isSearching = useSelector((state: RootState) => state.explore.isSearching);

    return arts && !searchResult && !isSearching ? (
        <InfiniteArts arts={arts!.pages.flat()} callback={fetchNextExplorePage} count={Infinity} />
    ) : null;
};

export default ShowExplore;
