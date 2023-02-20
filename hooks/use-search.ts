import { useInfiniteQuery } from "@tanstack/react-query";
import { getArts } from "api/arts.api";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "store";

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
