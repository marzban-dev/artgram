import { useInfiniteQuery } from "@tanstack/react-query";
import { getArts } from "apis/arts.api";

export const useArtistArtsQuery = (id: number) => {
    const limit = 10;
    const pageParamDefaults = { limit, offset: 0, artist: id, ordering: "artist" };

    return useInfiniteQuery(["artist-arts", id], ({ pageParam = pageParamDefaults }) => getArts({ pageParam }), {
        cacheTime: Infinity,
        staleTime: Infinity,
        getNextPageParam: (lastPage, pages) => {
            const page = pages.length + 1;

            const nextPage = {
                ...pageParamDefaults,
                offset: limit * page - limit,
            };

            return lastPage.next ? nextPage : undefined;
        },
    });
};
