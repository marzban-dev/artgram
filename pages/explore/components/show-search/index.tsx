import { IArt } from "api/arts.types";
import InfiniteArts from "components/infinite-arts";
import Spinner from "components/spinner";
import { useSearchQuery } from "hooks/use-search";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import flatInfiniteQueryData from "utils/flat-infinite-query-data";

const ShowSearch: React.FC = () => {
    const isSearching = useSelector((state: RootState) => state.explore.isSearching);
    const { data: searchResult, fetchNextPage: fetchNextSearchPage, hasNextPage } = useSearchQuery();

    return (
        <Fragment>
            {searchResult && !isSearching && (
                <InfiniteArts
                    arts={flatInfiniteQueryData<IArt>(searchResult)}
                    callback={fetchNextSearchPage}
                    hasNextPage={!!hasNextPage}
                />
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
