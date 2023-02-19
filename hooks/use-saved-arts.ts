import { useInfiniteQuery } from "@tanstack/react-query";
import { getSavedArts } from "api/user.api";

export const useSavedArtsQuery = (id: string) => {
    const pageParamDefaults = { owner: id, limit: 8, page: 1 };

    return useInfiniteQuery(["user-saves"], ({ pageParam = pageParamDefaults }) => getSavedArts({ pageParam }), {
        getNextPageParam: (lastPage, pages) => {
            const nextPage = {
                ...pageParamDefaults,
                page: pages.length + 1,
            };

            return lastPage.length !== 0 ? nextPage : undefined;
        },
    });
};
