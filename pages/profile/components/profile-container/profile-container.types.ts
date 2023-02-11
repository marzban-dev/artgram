import { IProfileInfoProps } from "./components/header/components/profile-info/profile-info.types";

export interface IProfileContainerProps {
    avatar: string;
    name: string;
    background?: string;
    description?: string;
    artsCount: number;
    profileInfo: IProfileInfoProps[];
    type: "user" | "artist";
}
