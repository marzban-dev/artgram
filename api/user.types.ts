import { IArt } from "./arts.types";

/**
 * Global types
 */

export interface IUser {
    first_name: string;
    username: string;
    profile_img: string;
    header_img: string;
    date_joined: string;
    bio: string;
    link: string;
    location: string;
}

export interface ISimpleUser {
    username: string;
    first_name: string;
    profile_img: string;
}

export interface IArtist extends IScrapApiArtist {
    id: string;
    name: string;
    wikipedia: string;
}

export interface IFollower extends Omit<IUser, "header_img" | "date_joined" | "bio" | "link" | "location"> {}

export interface ISavedArt {
    id: number;
    owner: IUser;
    text: string;
    created_date: string;
    art: IArt;
}

/**
 * Apis request, response types
 */

export interface IScrapApiArtist {
    description?: string;
    age?: string;
    quote?: string;
    googlearts?: string;
    artnet?: string;
    background?: string;
}

export interface IFollowUserRequestParams {
    id: number | string;
    state: boolean;
    type: "user" | "artist";
    token: string;
}

export interface IGetUserProfileRequestParams {
    id: string;
}

export interface IGetUserProfileResponse extends IUser {}

export interface IGetArtistRequestParams {
    id: string;
}

export interface IGetScrapAPiArtistResponse extends IScrapApiArtist {}

export interface IGetArtistResponse
    extends Omit<IArtist, "description" | "age" | "quote" | "googlearts" | "background"> {}

export interface IGetArtistProfileResponse extends IGetArtistResponse, IGetScrapAPiArtistResponse {
    artsCount: number;
    avatar: string;
}

export interface IGetFollowersRequestParams {
    pageParam: {
        id: string | number;
        type: "user" | "artist";
        limit: number;
        page: number;
    };
}

export interface IGetFollowersResponse {
    count: number;
    results: IFollower[];
}

export interface IGetSavedArtsRequestParams {
    pageParam: {
        id: number;
        limit: number;
        page: number;
        token?: string;
    };
}

export interface IGetSavedArtsResponse {
    count: number;
    results: ISavedArt[];
}

export interface ISaveArtRequestParams {
    id: number;
    token: string;
}

export interface IUnsaveArtRequestParams {
    id: number;
    token: string;
}
