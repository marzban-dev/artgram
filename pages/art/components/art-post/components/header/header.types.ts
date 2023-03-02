import { ISimpleArtist } from "api/arts.types";

export interface IHeaderProps {
    title: string;
    artist: ISimpleArtist;
    year: string;
}
