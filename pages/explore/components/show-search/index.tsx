import InfiniteArts from "components/infinite-arts";
import Spinner from "components/spinner";
import { useSearchQuery } from "hooks/use-search";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

const ShowSearch: React.FC = () => {
    const isSearching = useSelector((state: RootState) => state.explore.isSearching);
    const { data: searchResult, fetchNextPage: fetchNextSearchPage } = useSearchQuery();

    return (
        <Fragment>
            {searchResult && !isSearching && (
                <InfiniteArts arts={searchResult.pages.flat()} callback={fetchNextSearchPage} count={Infinity} />
            )}
            {isSearching && (
                <div className="w-full flex flex-col justify-center items-center gap-4">
                    <Spinner size={40} />
                    <span className="text-white text-[18px] font-medium">Searching</span>
                </div>
            )}
        </Fragment>
    );
};

export default ShowSearch;
