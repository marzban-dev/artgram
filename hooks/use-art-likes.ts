import { useInfiniteQuery } from "@tanstack/react-query";
import { getArtLikes } from "api/arts.api";

export const useArtLikesQuery = (id: number, enabled: boolean) => {
    const pageParamDefaults = { id, limit: 5, page: 1 };

    return useInfiniteQuery(["art-likes", id], ({ pageParam = pageParamDefaults }) => getArtLikes({ pageParam }), {
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
