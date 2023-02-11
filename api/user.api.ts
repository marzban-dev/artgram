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
    IGetSavedArtsResponse,
    IGetScrapAPiArtistResponse,
    IGetUserProfileRequestParams,
    IGetUserProfileResponse,
    ISaveArtRequestParams,
    IUnsaveArtRequestParams,
} from "./user.types";

export const getUserProfile = async (params: IGetUserProfileRequestParams) => {
    const response = await axios.get<IGetUserProfileResponse>(`/user/get/${params.id}/`);

    return response.data;
};

export const getArtistProfile = async (params: IGetArtistRequestParams): Promise<IGetArtistProfileResponse> => {
    const axiosOption = {
        baseURL: "http://localhost:3000",
    };

    let artistName: string;
    let artistArtsCount: number;
    let artistResponse: AxiosResponse<IGetArtistResponse, any>;
    let scrapApiResponse: AxiosResponse<IGetScrapAPiArtistResponse, any>;
    let artistImageApiResponse: AxiosResponse<string, any>;

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

    const splittedUrl = artistResponse.data.wikipedia.split("/");
    artistName = splittedUrl[splittedUrl.length - 1];
    artistImageApiResponse = await axios.get<string>(
        `/api/artist-picture?q=${artistName + " artist picture wikipedia"}`,
        axiosOption
    );

    try {
        scrapApiResponse = await axios.get<IGetScrapAPiArtistResponse>(`/api/artist?q=${artistName}`, axiosOption);
    } catch (e) {
        return {
            artsCount: artistArtsCount,
            ...artistResponse.data,
            avatar: artistImageApiResponse.data,
        };
    }

    return {
        artsCount: artistArtsCount,
        ...artistResponse.data,
        ...scrapApiResponse.data,
        avatar: artistImageApiResponse.data,
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

    const response = await axios.get<IGetSavedArtsResponse>("/user/reposts/", {
        params: {
            owner: params.pageParam.id,
            limit,
            offset,
        },
    });

    return response.data.results;
};

export const saveArt = async (params: ISaveArtRequestParams) => {
    await axios.post("/user/reposts/", { art: params.id }, { headers: { ...createAuthHeader(params.token) } });
};

export const unsaveArt = async (params: IUnsaveArtRequestParams) => {
    await axios.delete(`/user/${params.id}/`, { headers: { ...createAuthHeader(params.token) } });
};
