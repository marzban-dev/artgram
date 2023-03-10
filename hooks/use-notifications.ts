import { useInfiniteQuery } from "@tanstack/react-query";
import { getNotifications } from "apis/user.api";

export const useNotificationsQuery = (enabled: boolean = false) => {
    const pageParamDefaults = { limit: 5, page: 1 };

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
