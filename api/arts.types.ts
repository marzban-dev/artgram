/**
 * Global types
 */

import { ISimpleUser } from "./user.types";

export interface IArtist {
    id: number;
    name: string;
    wikipedia: string;
}

export interface IArt {
    id: number;
    title: string;
    picture: string;
    year: string;
    type: string;
    location: string;
    reference: string;
    artist: IArtist;
    likes_count: number;
    user_like: boolean;
    user_repost: boolean;
}

export interface IArtLike {
    id: number;
    owner: ISimpleUser;
    created_date: string;
    art: IArt;
}

/**
 * Apis request, response types
 */

type TOrdering = "artist" | "title" | "year" | "type" | "location" | "reference";

export interface IGetArtsRequestParams {
    pageParam: {
        artist?: number;
        title__contains?: string;
        year__contains?: string;
        type__contains?: string;
        location__contains?: string;
        ordering?: TOrdering | `-${TOrdering}`;
        limit?: number;
        offset?: number;
        token?: string;
    };
}

export interface IGetArtsResponse {
    count: number;
    results: IArt[];
}

export interface IGetArtRequestParams {
    id: number;
    token?: string;
}

export interface IGetArtResponse extends IArt {}

export interface ILikeArtRequestParams {
    id: number;
    token: string;
}

export interface IUnlikeArtRequestParams {
    id: number;
    token: string;
}

export interface IGetArtLikesRequestParams {
    id: number;
}

export interface IGetArtLikesResponse {
    count: number;
    results: IArtLike[];
}
