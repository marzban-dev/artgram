import { useInfiniteQuery } from "@tanstack/react-query";
import { getFollowers } from "api/user.api";

export const useFollowersQuery = (id: string | number, type: "user" | "artist") => {
    const pageParamDefaults = { id, type, limit: 15, page: 1 };

    return useInfiniteQuery(["followers", id], ({ pageParam = pageParamDefaults }) => getFollowers({ pageParam }), {
        getNextPageParam: (_lastPage, pages) => {
            return {
                ...pageParamDefaults,
                page: pages.length + 1,
            };
        },
    });
};
