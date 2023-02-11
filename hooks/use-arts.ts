import { useInfiniteQuery } from "@tanstack/react-query";
import { getArts } from "api/arts.api";
import { useSession } from "next-auth/react";

export const useArtsQuery = (id: number) => {
    const { data } = useSession();
    const pageParamDefaults = { limit: 5, token: data?.accessToken };

    return useInfiniteQuery(["arts", id], ({ pageParam = pageParamDefaults }) => getArts({ pageParam }), {
        cacheTime: Infinity,
        staleTime: Infinity,
        getNextPageParam: () => {
            return pageParamDefaults;
        },
    });
};
