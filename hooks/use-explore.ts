import { useInfiniteQuery } from "@tanstack/react-query";
import { getArts } from "api/arts.api";

export const useExploreQuery = () => {
    const pageParamDefaults = { limit: 15 };

    return useInfiniteQuery(["explore"], ({ pageParam = pageParamDefaults }) => getArts({ pageParam }), {
        cacheTime: Infinity,
        staleTime: Infinity,
        getNextPageParam: () => {
            return pageParamDefaults;
        },
    });
};
