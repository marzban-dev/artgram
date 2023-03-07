import { useInfiniteQuery } from "@tanstack/react-query";
import { getFollowingArtist } from "apis/user.api";

export const useFollowingArtistsQuery = (id: string, enabled: boolean) => {
    const pageParamDefaults = { id, type: "artist", limit: 15, page: 1 };

    return useInfiniteQuery(
        ["following-artists", id],
        ({ pageParam = pageParamDefaults }) => getFollowingArtist({ pageParam }),
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
