import { useQueryClient } from "@tanstack/react-query";
import { IArt } from "apis/arts.types";
import InfiniteArts from "components/infinite-arts";
import Spinner from "components/spinner";
import { useExploreQuery } from "hooks/use-explore";
import { useSearchQuery } from "hooks/use-search";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setAllowExploreLoadMore } from "store/slice/explore.slice";
import flatInfiniteQueryData from "utils/flat-infinite-query-data";

const ShowExplore: React.FC = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const allowFetchNext = useSelector((state: RootState) => state.explore.allowExploreLoadMore);
    const { data: arts, fetchNextPage, isLoading, isFetching } = useExploreQuery();

    useEffect(() => {
        if (!isLoading && !isFetching) dispatch(setAllowExploreLoadMore(true));
    }, [isLoading, isFetching]);

    useEffect(() => {
        if (!allowFetchNext) {
            queryClient.setQueryData(["explore"], (prevQueryData: any) => {
                if (prevQueryData) {
                    return {
                        pageParams: [prevQueryData.pageParams[0]],
                        pages: [prevQueryData.pages[0]],
                    };
                }
                return prevQueryData;
            });
        }
    }, [allowFetchNext]);

    const { data: searchResult } = useSearchQuery();

    if (arts && !searchResult) {
        return (
            <Fragment>
                {!allowFetchNext && (
                    <div className="flex w-full items-center justify-center pt-2 pb-6">
                        <Spinner size={40} />
                    </div>
                )}
                <InfiniteArts
                    arts={flatInfiniteQueryData<IArt>(arts!)}
                    callback={fetchNextPage}
                    hasNextPage={allowFetchNext}
                />
            </Fragment>
        );
    } else {
        if (!arts) return <Spinner size={40} />;
        else return null;
    }
};

export default ShowExplore;
