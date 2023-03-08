import { useInfiniteQuery } from "@tanstack/react-query";
import { getArts } from "apis/arts.api";
import { useSelector } from "react-redux";
import { RootState } from "store";

export const useExploreQuery = () => {
    const allowFetchNext = useSelector((state: RootState) => state.explore.allowExploreLoadMore);

    const pageParamDefaults = { limit: 15 };

    return useInfiniteQuery(["explore"], ({ pageParam = pageParamDefaults }) => getArts({ pageParam }), {
        cacheTime: Infinity,
        staleTime: !allowFetchNext ? 0 : Infinity,
        getNextPageParam: () => pageParamDefaults,
    });
};
