import { useInfiniteQuery } from "@tanstack/react-query";
import { getArts } from "api/arts.api";
import { useSession } from "next-auth/react";

export const useArtistArtsQuery = (id: number) => {
    const { data } = useSession();

    const limit = 10;
    const pageParamDefaults = { limit, offset: 0, artist: id, ordering: "artist", token: data?.accessToken };

    return useInfiniteQuery(["artist-arts", id], ({ pageParam = pageParamDefaults }) => getArts({ pageParam }), {
        cacheTime: Infinity,
        staleTime: Infinity,
        getNextPageParam: (_lastPage, pages) => {
            const page = pages.length + 1;

            return {
                ...pageParamDefaults,
                offset: limit * page - limit,
            };
        },
    });
};
