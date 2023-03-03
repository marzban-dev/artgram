import { useInfiniteQuery } from "@tanstack/react-query";
import { getFollowing } from "api/user.api";

export const useFollowingQuery = (id: string, type: "user" | "artist", enabled: boolean) => {
    const pageParamDefaults = { id, type, limit: 15, page: 1 };

    return useInfiniteQuery(["following", id], ({ pageParam = pageParamDefaults }) => getFollowing({ pageParam }), {
        enabled,
        placeholderData: {
            pages: [{ items: [], next: "", count: 0 }],
            pageParams: [null],
        },
        getNextPageParam: (lastPage, pages) => {
            const nextPage = {
                ...pageParamDefaults,
                page: pages.length + 1,
            };

            return lastPage.next ? nextPage : undefined;
        },
    });
};
