import axios from "config/axios";
import {
    IGetArtRequestParams,
    IGetArtResponse,
    IGetArtsRequestParams,
    IGetArtsResponse,
} from "./arts.types";

export const getArt = async (params: IGetArtRequestParams) => {
    const response = await axios.get<IGetArtResponse>(`/${params.id}`);

    return response.data;
};

export const getArts = async (params: IGetArtsRequestParams = {}) => {
    const response = await axios.get<IGetArtsResponse>("/", { params });

    return response.data.results;
};
