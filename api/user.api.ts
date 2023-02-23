import axios from "config/axios";
import {
    IFollowUserRequestParams,
    IGetArtistRequestParams,
    IGetArtistResponse,
    IGetFollowersRequestParams,
    IGetFollowersResponse,
    IGetNotificationsRequestParams,
    IGetNotificationsResponse,
    IGetSavedArtsRequestParams,
    IGetSavedArtsResponse,
    IGetUserProfileRequestParams,
    IGetUserProfileResponse,
    ISaveArtRequestParams,
    ISeenNotificationRequestParams,
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
        `/${params.pageParam.type}/${params.pageParam.id}/followers/`,
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
        params: { owner: params.pageParam.id, limit, offset },
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

export const seenNotification = async (params: ISeenNotificationRequestParams) => {
    await axios.get<IGetNotificationsResponse>(`/user/notification/${params.id}/markasread/`);
};
