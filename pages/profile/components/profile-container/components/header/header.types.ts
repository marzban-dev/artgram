import { IProfileInfoProps } from "../profile-infos/components/profile-info/profile-info.types";

export interface IHeaderProps {
    id: string;
    background?: string;
    avatar: string;
    username: string;
    firstName?: string;
    isFollowing: boolean;
    followers: number;
    following?: number;
    followingArtists?: number;
    isFetching: boolean;
    type: "user" | "artist";
}
