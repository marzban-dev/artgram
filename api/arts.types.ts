export interface IArtist {
    id: number;
    name: string;
    wikipedia: string;
}

export interface IArt {
    id: number;
    title: string;
    picture: string;
    year: string;
    type: string;
    location: string;
    reference: string;
    artist: IArtist;
}

type TOrdering = "id" | "title" | "year" | "type" | "location" | "reference" | "artist";

export interface IGetArtsRequestParams {
    artist?: string;
    title__contains?: string;
    year__contains?: string;
    type__contains?: string;
    location__contains?: string;
    ordering?: TOrdering | `-${TOrdering}`;
    limit?: number;
    offset?: number;
}

export interface IGetArtsResponse {
    count: number;
    results: IArt[];
}

export interface IGetArtRequestParams {
    id: number;
}

export interface IGetArtResponse extends IArt {}
