import axios from "config/axios";
import createAuthHeader from "utils/create-auth-header";
import sleep from "utils/sleep";
import {
    IGetArtRequestParams,
    IGetArtResponse,
    IGetArtsRequestParams,
    IGetArtsResponse,
    ILikeArtRequestParams,
    IGetArtLikesRequestParams,
    IGetArtLikesResponse,
    IUnlikeArtRequestParams,
} from "./arts.types";

export const getArt = async (params: IGetArtRequestParams) => {
    const options = {
        headers: {},
    };

    if (params.token) options.headers = { ...createAuthHeader(params.token) };

    const response = await axios.get<IGetArtResponse>(`/${params.id}/`, options);

    return response.data;
};

export const getArts = async (params: IGetArtsRequestParams) => {
    const options = {
        params: { ...params.pageParam, token: undefined },
        headers: {},
    };

    if (params.pageParam.token) options.headers = { ...createAuthHeader(params.pageParam.token) };

    const response = await axios.get<IGetArtsResponse>("/", options);

    return response.data.results;
};

export const getArtLikes = async (params: IGetArtLikesRequestParams) => {
    const response = await axios.get<IGetArtLikesResponse>(`/art/like/`, { params: { art: params.pageParam.id } });

    return {
        count: response.data.count,
        next: response.data.next,
        items: response.data.results,
    };
};

export const likeArt = async (params: ILikeArtRequestParams) => {
    const data = {
        art: params.id,
    };

    const options = {
        headers: { ...createAuthHeader(params.token) },
    };

    await axios.post("/art/like/", data, options);
};

export const unlikeArt = async (params: IUnlikeArtRequestParams) => {
    const options = {
        headers: { ...createAuthHeader(params.token) },
    };

    await axios.delete(`/art/like/${params.id}/`, options);
};
