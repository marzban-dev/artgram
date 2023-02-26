import { useInfiniteQuery } from "@tanstack/react-query";
import { getFollowers } from "api/user.api";

export const useFollowersQuery = (id: string, type: "user" | "artist", initialData: number = 0) => {
    const pageParamDefaults = { id, type, limit: 15, page: 1 };

    return useInfiniteQuery(["followers", id], ({ pageParam = pageParamDefaults }) => getFollowers({ pageParam }), {
        placeholderData: {
            pages: [{ items: [], next: "", count: initialData }],
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
