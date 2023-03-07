/**
 * Global types
 */

import { ISimpleUser, IUser } from "./user.types";

export interface IArtist {
    id: number;
    name: string;
    birth_data: string;
    profession: string;
    school: string;
    bio: string;
    image: string;
    wikipedia: string | null;
    following: boolean;
}

export interface ISimpleArtist {
    id: number;
    name: string;
    image: string;
    profession: string;
    following: boolean;
}

export interface IImage {
    id: number;
    url: string;
    width: number;
    height: number;
    thumbnail: string;
}

export interface IArt {
    id: number;
    artist: ISimpleArtist;
    title: string;
    image: IImage;
    date: string;
    technique: string;
    location: string;
    type: string;
    form: string;
    school: string;
    reference: string;
    likes_count: number;
    user_like: boolean;
    user_repost: boolean;
}

export interface ISavedArt {
    id: number;
    owner: IUser;
    text: string;
    created_date: string;
    art: IArt;
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

type TOrdering =
    | "artist"
    | "title"
    | "date"
    | "technique"
    | "form"
    | "school"
    | "type"
    | "location"
    | "reference"
    | "likes_count";

export interface IGetArtsRequestParams {
    pageParam: {
        artist?: number;
        title__contains?: string;
        date__contains?: string;
        technique__contains?: string;
        form__contains?: string;
        school__contains?: string;
        type__contains?: string;
        location__contains?: string;
        ordering?: TOrdering | `-${TOrdering}`;
        limit?: number;
        offset?: number;
    };
}

export interface IGetArtsResponse {
    count: number;
    next: string | null;
    results: IArt[];
}

export interface IGetArtRequestParams {
    id: number;
    token?: string;
}

export interface IGetArtResponse extends IArt {}

export interface ILikeArtRequestParams {
    id: number;
}

export interface IUnlikeArtRequestParams {
    id: number;
}

export interface IGetArtLikesRequestParams {
    pageParam: {
        id: number;
        limit: number;
        page: number;
    };
}

export interface IGetArtLikesResponse {
    count: number;
    next: string | null;
    results: IArtLike[];
}

export interface IGetSavedArtsRequestParams {
    pageParam: {
        id: string;
        limit: number;
        page: number;
    };
}

export interface IGetSavedArtsResponse {
    count: number;
    next: string | null;
    results: ISavedArt[];
}

export interface ISaveArtRequestParams {
    id: number;
}

export interface IUnsaveArtRequestParams {
    id: number;
}
