import { IProfileInfoProps } from "./components/profile-infos/components/profile-info/profile-info.types";

export interface IProfileContainerProps {
    avatar: string;
    username: string;
    firstName?: string;
    background?: string;
    description?: string;
    isFollowing: boolean;
    followers: number;
    following?: number;
    profileInfo: IProfileInfoProps[];
    type: "user" | "artist";
}
