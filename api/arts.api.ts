import axios from "config/axios";
import {
    IGetArtLikesRequestParams,
    IGetArtLikesResponse,
    IGetArtRequestParams,
    IGetArtResponse,
    IGetArtsRequestParams,
    IGetArtsResponse,
    ILikeArtRequestParams,
    IUnlikeArtRequestParams
} from "./arts.types";

export const getArt = async (params: IGetArtRequestParams) => {
    const response = await axios.get<IGetArtResponse>(`/${params.id}/`);
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
    const response = await axios.get<IGetArtLikesResponse>(`/art/like/`, { params: { art: params.pageParam.id } });

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
