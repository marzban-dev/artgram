import { useInfiniteQuery } from "@tanstack/react-query";
import { getFollowers } from "api/user.api";

export const useFollowersQuery = (id: string | number, type: "user" | "artist", enabled: boolean) => {
    const pageParamDefaults = { id, type, limit: 15, page: 1 };

    return useInfiniteQuery(
        ["followers", type === "artist" ? Number(id) : id],
        ({ pageParam = pageParamDefaults }) => getFollowers({ pageParam }),
        {
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
        }
    );
};
