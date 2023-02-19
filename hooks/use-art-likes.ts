import { useInfiniteQuery } from "@tanstack/react-query";
import { getArtLikes } from "api/arts.api";

export const useArtLikesQuery = (id: number, initialData: number = 0) => {
    const pageParamDefaults = { id };

    return useInfiniteQuery(["art-likes", id], ({ pageParam = pageParamDefaults }) => getArtLikes({ pageParam }), {
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
