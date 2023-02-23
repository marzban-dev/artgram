import { useInfiniteQuery } from "@tanstack/react-query";
import { getArts } from "api/arts.api";

export const useArtsQuery = (id: number) => {
    const pageParamDefaults = { limit: 5 };

    return useInfiniteQuery(["arts", id], ({ pageParam = pageParamDefaults }) => getArts({ pageParam }), {
        cacheTime: Infinity,
        staleTime: Infinity,
        getNextPageParam: () => {
            return pageParamDefaults;
        },
    });
};
