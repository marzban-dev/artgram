import { IArt } from "apis/arts.types";
import InfiniteArts from "components/infinite-arts";
import { useSearchQuery } from "hooks/use-search";
import { Fragment } from "react";
import flatInfiniteQueryData from "utils/flat-infinite-query-data";

const ShowSearch: React.FC = () => {
    const { data: searchResult, fetchNextPage: fetchNextSearchPage, hasNextPage } = useSearchQuery();

    return (
        <Fragment>
            {searchResult && (
                <InfiniteArts
                    arts={flatInfiniteQueryData<IArt>(searchResult)}
                    callback={fetchNextSearchPage}
                    hasNextPage={!!hasNextPage}
                />
            )}
        </Fragment>
    );
};

export default ShowSearch;
