import { IProfileInfoProps } from "./components/header/components/profile-info/profile-info.types";

export interface IProfileContainerProps {
    avatar: string;
    username: string;
    firstName?: string;
    background?: string;
    description?: string;
    profileInfo: IProfileInfoProps[];
    type: "user" | "artist";
}
