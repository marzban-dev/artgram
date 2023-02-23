import { IProfileInfoProps } from "../profile-info/profile-info.types";

export interface IHeaderProps {
    id: string;
    background?: string;
    avatar: string;
    username: string;
    firstName?: string;
    isFollowing: boolean;
    type: "user" | "artist";
}
