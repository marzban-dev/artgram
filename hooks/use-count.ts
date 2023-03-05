import { useQuery } from "@tanstack/react-query";
import { getArtLikes } from "api/arts.api";
import { getFollowers, getFollowing, getFollowingArtist, getNotifications } from "api/user.api";

type TRequestTypes = "following" | "following-artists" | "followers" | "notifications" | "art-likes";

type TRequestParams = {
    id?: string | number;
    type?: "user" | "artist";
};

type TKey = [type: TRequestTypes, id: number | string];

export const useCountQuery = (key: TKey, initial: number, params?: TRequestParams, enabled: boolean = true) => {
    const pageParamDefaults = { limit: 0, page: 1 };
    
    return useQuery(
        [key[0] + "-count", key[1]],
        async ({ pageParam = pageParamDefaults }) => {
            const fetchData = async () => {
                if (key[0] === "notifications") return getNotifications({ pageParam });
                if (key[0] === "followers") return getFollowers({ pageParam: { ...pageParam, id: params!.id, type: params!.type } });
                if (key[0] === "following") return getFollowing({ pageParam: { ...pageParam, id: params!.id, type: params!.type } });
                if (key[0] === "following-artists") return getFollowingArtist({ pageParam: { ...pageParam, id: params!.id } });
                if (key[0] === "art-likes") return getArtLikes({ pageParam: { ...pageParam, id: params!.id } });
            };

            const response = await fetchData();
            return response!.count;
        },
        {
            enabled,
            placeholderData: initial,
        }
    );
};
