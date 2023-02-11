import { IProfileInfoProps } from "./components/profile-info/profile-info.types";

export interface IHeaderProps {
    background?: string;
    avatar: string;
    name: string;
    info: IProfileInfoProps[];
}
