import { AxiosResponse } from "axios";
import axios from "config/axios";
import createAuthHeader from "utils/create-auth-header";
import { IGetArtsResponse } from "./arts.types";
import {
    IFollowUserRequestParams,
    IGetArtistProfileResponse,
    IGetArtistRequestParams,
    IGetArtistResponse,
    IGetFollowersRequestParams,
    IGetFollowersResponse,
    IGetSavedArtsRequestParams,
    IGetSavedArtsResponse, IGetUserProfileRequestParams,
    IGetUserProfileResponse,
    ISaveArtRequestParams,
    IUnsaveArtRequestParams
} from "./user.types";

export const getUserProfile = async (params: IGetUserProfileRequestParams) => {
    const response = await axios.get<IGetUserProfileResponse>(`/user/get/${params.id}/`);

    return response.data;
};

export const getArtistProfile = async (params: IGetArtistRequestParams): Promise<IGetArtistProfileResponse> => {
    let artistArtsCount: number;
    let artistResponse: AxiosResponse<IGetArtistResponse, any>;

    try {
        artistResponse = await axios.get<IGetArtistResponse>(`/artist/${params.id}/`);
        const artistArtsCountResponse = await axios.get<IGetArtsResponse>(`/`, {
            params: {
                limit: 1,
                artist: params.id,
            },
        });

        artistArtsCount = Number(artistArtsCountResponse.data.count);
    } catch (e) {
        throw e;
    }

    return {
        artsCount: artistArtsCount,
        ...artistResponse.data,
    };
};

export const followUser = async (params: IFollowUserRequestParams) => {
    await axios.post(`/user/follow/${params.type}/${params.id}/`, null, {
        headers: { ...createAuthHeader(params.token) },
    });
};

export const getFollowers = async (params: IGetFollowersRequestParams) => {
    const limit = params.pageParam.limit;
    const offset = params.pageParam.page * limit - limit;

    const response = await axios.get<IGetFollowersResponse>(
        `/${params.pageParam.type}/${params.pageParam.id}/followers/`,
        { params: { limit, offset } }
    );

    return response.data.results;
};

export const getSavedArts = async (params: IGetSavedArtsRequestParams) => {
    const limit = params.pageParam.limit;
    const offset = params.pageParam.page * limit - limit;

    const response = await axios.get<IGetSavedArtsResponse>("/repost/", {
        params: {
            owner: params.pageParam.id,
            limit,
            offset,
        },
    });

    return response.data.results;
};

export const saveArt = async (params: ISaveArtRequestParams) => {
    await axios.post("/repost/", { art: params.id }, { headers: { ...createAuthHeader(params.token) } });
};

export const unsaveArt = async (params: IUnsaveArtRequestParams) => {
    await axios.delete(`/repost/${params.id}/`, { headers: { ...createAuthHeader(params.token) } });
};
