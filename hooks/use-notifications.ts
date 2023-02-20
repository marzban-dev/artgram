import { useInfiniteQuery } from "@tanstack/react-query";
import { getNotifications, getSavedArts } from "api/user.api";
import { useSession } from "next-auth/react";

export const useNotificationsQuery = ({ enabled }: { enabled: boolean }) => {
    const { data } = useSession();
    const pageParamDefaults = { limit: 5, page: 1, token: data?.accessToken };

    return useInfiniteQuery(["notifications"], ({ pageParam = pageParamDefaults }) => getNotifications({ pageParam }), {
        enabled,
        getNextPageParam: (lastPage, pages) => {
            const nextPage = {
                ...pageParamDefaults,
                page: pages.length + 1,
            };

            return lastPage.next ? nextPage : undefined;
        },
    });
};
