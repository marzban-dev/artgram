import { IArt, IArtist } from "./arts.types";

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
    following: boolean;
    repost_count: number;
    followings_count: number;
    followers_count: number;
}

export interface ISimpleUser {
    username: string;
    first_name: string;
    profile_img: string;
}

export interface IFollower extends ISimpleUser {}

export interface ISavedArt {
    id: number;
    owner: IUser;
    text: string;
    created_date: string;
    art: IArt;
}

export interface INotification {
    id: number;
    type: "f" | "rl";
    obj: IUser;
    object_id: string;
    date: string;
    is_read: boolean;
    owner: IUser;
}

export interface IFollowUserRequestParams {
    id: string;
    type: "user" | "artist";
}

export interface IGetUserProfileRequestParams {
    id: string;
}

export interface IGetUserProfileResponse extends IUser {}

export interface IGetArtistRequestParams {
    id: string;
}

export interface IGetArtistResponse extends IArtist {}

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
    next: string | null;
    results: IFollower[];
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

export interface IGetNotificationsRequestParams {
    pageParam: {
        limit: number;
        page: number;
    };
}

export interface IGetNotificationsResponse {
    count: number;
    next: string | null;
    results: INotification[];
}

export interface ISeenNotificationsRequestParams {
    id: number;
}
