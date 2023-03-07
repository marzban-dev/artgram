import axios from "config/axios";
import {
    IGetArtLikesRequestParams,
    IGetArtLikesResponse,
    IGetArtRequestParams,
    IGetArtResponse,
    IGetArtsRequestParams,
    IGetArtsResponse,
    IGetSavedArtsRequestParams,
    IGetSavedArtsResponse,
    ILikeArtRequestParams,
    ISaveArtRequestParams,
    IUnlikeArtRequestParams,
    IUnsaveArtRequestParams
} from "./arts.types";

export const getArt = async (params: IGetArtRequestParams) => {
    const headers = params.token ? { Authorization: `Bearer ${params.token}` } : {};

    const response = await axios.get<IGetArtResponse>(`/${params.id}/`, { headers });

    return response.data;
};

export const getArts = async (params: IGetArtsRequestParams) => {
    const response = await axios.get<IGetArtsResponse>("/", {
        params: { ...params.pageParam, token: undefined },
    });

    return {
        items: response.data.results,
        next: response.data.next,
        count: response.data.count,
    };
};

export const getArtLikes = async (params: IGetArtLikesRequestParams) => {
    const limit = params.pageParam.limit;
    const offset = params.pageParam.page * limit - limit;

    const response = await axios.get<IGetArtLikesResponse>(`/art/like/`, {
        params: { art: params.pageParam.id, limit, offset },
    });

    return {
        count: response.data.count,
        next: response.data.next,
        items: response.data.results,
    };
};

export const likeArt = async (params: ILikeArtRequestParams) => {
    await axios.post("/art/like/", { art: params.id });
};

export const unlikeArt = async (params: IUnlikeArtRequestParams) => {
    await axios.delete(`/art/like/${params.id}/`);
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
