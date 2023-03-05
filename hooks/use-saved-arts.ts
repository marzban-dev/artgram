import { useInfiniteQuery } from "@tanstack/react-query";
import { getSavedArts } from "api/arts.api";

export const useSavedArtsQuery = (id: string) => {
    const pageParamDefaults = { owner: id, limit: 8, page: 1 };

    return useInfiniteQuery(["user-saves", id], ({ pageParam = pageParamDefaults }) => getSavedArts({ pageParam }), {
        getNextPageParam: (lastPage, pages) => {
            const nextPage = {
                ...pageParamDefaults,
                page: pages.length + 1,
            };

            return lastPage.next ? nextPage : undefined;
        },
    });
};
