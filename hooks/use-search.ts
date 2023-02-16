import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getArts } from "api/arts.api";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { IArt } from "api/arts.types";

export const useSearchQuery = () => {
    const search = useSelector((state: RootState) => state.explore.search);
    const searchBy = useSelector((state: RootState) => state.explore.searchBy);
    const orderBy = useSelector((state: RootState) => state.explore.orderBy);
    const { data } = useSession();

    const limit = 15;

    const pageParamDefaults = {
        ordering: `${orderBy === "des" ? "-" : ""}${searchBy}`,
        [`${searchBy}__contains`]: search,
        limit,
        offset: 0,
        token: data?.accessToken,
    };

    return useInfiniteQuery(["search"], ({ pageParam = pageParamDefaults }) => getArts({ pageParam }), {
        enabled: !!search,
        getNextPageParam: (_lastPage, pages) => {
            const page = pages.length + 1;

            return {
                ...pageParamDefaults,
                offset: limit * page - limit,
            };
        },
    });
};
