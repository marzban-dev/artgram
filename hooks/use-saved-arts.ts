import { useInfiniteQuery } from "@tanstack/react-query";
import { getSavedArts } from "api/user.api";

export const useSavedArtsQuery = (id: number) => {
    const pageParamDefaults = { owner: id, limit: 8, page: 1 };

    return useInfiniteQuery(["user-saves"], ({ pageParam = pageParamDefaults }) => getSavedArts({ pageParam }), {
        getNextPageParam: (_lastPage, pages) => {
            return {
                ...pageParamDefaults,
                page: pages.length + 1,
            };
        },
    });
};
