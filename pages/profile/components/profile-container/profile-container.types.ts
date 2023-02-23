import { IProfileInfoProps } from "./components/profile-info/profile-info.types";

export interface IProfileContainerProps {
    avatar: string;
    username: string;
    firstName?: string;
    background?: string;
    description?: string;
    isFollowing: boolean;
    profileInfo: IProfileInfoProps[];
    type: "user" | "artist";
}
