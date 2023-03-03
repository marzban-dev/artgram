import axios from "config/axios";
import {
    IFollowUserRequestParams,
    IGetArtistRequestParams,
    IGetArtistResponse,
    IGetFollowersRequestParams,
    IGetFollowersResponse,
    IGetFollowingRequestParams,
    IGetFollowingResponse,
    IGetNotificationsRequestParams,
    IGetNotificationsResponse,
    IGetSavedArtsRequestParams,
    IGetSavedArtsResponse,
    IGetUserProfileRequestParams,
    IGetUserProfileResponse,
    ISaveArtRequestParams,
    ISeenNotificationsRequestParams,
    IUnsaveArtRequestParams,
} from "./user.types";

export const getUserProfile = async (params: IGetUserProfileRequestParams) => {
    const response = await axios.get<IGetUserProfileResponse>(`/user/get/${params.id}/`);
    return response.data;
};

export const getArtistProfile = async (params: IGetArtistRequestParams) => {
    const response = await axios.get<IGetArtistResponse>(`/artist/${params.id}/`);
    return response.data;
};

export const followUser = async (params: IFollowUserRequestParams) => {
    await axios.post(`/user/follow/${params.type}/${params.id}/`, null);
};

export const getFollowers = async (params: IGetFollowersRequestParams) => {
    const limit = params.pageParam.limit;
    const offset = params.pageParam.page * limit - limit;

    const response = await axios.get<IGetFollowersResponse>(
        `/${params.pageParam.type}/${params.pageParam.id}/follower${params.pageParam.type === "artist" ? "s" : ""}/`,
        { params: { limit, offset } }
    );

    return {
        count: response.data.count,
        next: response.data.next,
        items: response.data.results,
    };
};

export const getFollowing = async (params: IGetFollowingRequestParams) => {
    const limit = params.pageParam.limit;
    const offset = params.pageParam.page * limit - limit;

    const response = await axios.get<IGetFollowingResponse>(
        `/${params.pageParam.type}/${params.pageParam.id}/following/`,
        { params: { limit, offset } }
    );

    return {
        count: response.data.count,
        next: response.data.next,
        items: response.data.results,
    };
};

export const getSavedArts = async (params: IGetSavedArtsRequestParams) => {
    const limit = params.pageParam.limit;
    const offset = params.pageParam.page * limit - limit;

    const response = await axios.get<IGetSavedArtsResponse>("/repost/", {
        params: { owner: params.pageParam.id, ordering: "-created_date", limit, offset },
    });

    return {
        count: response.data.count,
        next: response.data.next,
        items: response.data.results,
    };
};

export const saveArt = async (params: ISaveArtRequestParams) => {
    await axios.post("/repost/", { art: params.id });
};

export const unsaveArt = async (params: IUnsaveArtRequestParams) => {
    await axios.delete(`/repost/${params.id}/`);
};

export const getNotifications = async (params: IGetNotificationsRequestParams) => {
    const limit = params.pageParam.limit;
    const offset = params.pageParam.page * limit - limit;

    const response = await axios.get<IGetNotificationsResponse>("/user/notification/", {
        params: { limit, offset },
    });

    return {
        count: response.data.count,
        next: response.data.next,
        items: response.data.results,
    };
};

export const checkNotifications = async () => {
    const response = await getNotifications({ pageParam: { limit: 1, page: 1 } });
    if (response.items.length !== 0) return !response.items[0].is_read;
    else return false;
};

export const seenNotifications = async (params: ISeenNotificationsRequestParams) => {
    await axios.post(`/user/notification/${params.id}/`);
};
