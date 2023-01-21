import { useInfiniteQuery } from "@tanstack/react-query";
import { getArts } from "api/arts.api";

export const useExplore = () => {
    return useInfiniteQuery(["explore"], () => getArts({ limit: 18 }), {
        cacheTime: Infinity,
        staleTime: Infinity,
        getNextPageParam: (_lastPage, pages) => {
            return { page: pages.length + 1 };
        },
    });
};
