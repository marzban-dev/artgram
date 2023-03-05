import { useInfiniteQuery } from "@tanstack/react-query";
import { getArts } from "api/arts.api";

export const useExploreQuery = () => {
    const pageParamDefaults = { page: 1, limit: 15 };

    return useInfiniteQuery(
        ["explore"],
        ({ pageParam = pageParamDefaults }) => {
            const exploreCache = localStorage.getItem("explore-cache");

            if (pageParam.page === 1 && exploreCache) {
                return JSON.parse(exploreCache);
            }

            return getArts({ pageParam: { limit: pageParam.limit } });
        },
        {
            cacheTime: Infinity,
            staleTime: Infinity,
            onSuccess: (data) => {
                if (data.pages.length === 1) localStorage.setItem("explore-cache", JSON.stringify(data.pages[0]));
            },
            getNextPageParam: (_lastPage, pages) => {
                return { ...pageParamDefaults, page: pages.length + 1 };
            },
        }
    );
};
