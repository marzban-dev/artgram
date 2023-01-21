import { useInfiniteQuery } from "@tanstack/react-query";
import { getArts } from "api/arts.api";

export const useArtsQuery = (id: number) => {
    // @ts-ignore
    return useInfiniteQuery(["arts", id], () => getArts({ limit: 5 }), {
        cacheTime: Infinity,
        staleTime: Infinity,
        getNextPageParam: (_lastPage, pages) => {
            return { page: pages.length + 1 };
        },
    });
};
