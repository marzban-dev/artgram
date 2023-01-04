import axios from "config/axios";

export interface IArt {
    id: number;
    title: string;
    picture: string;
    year: string;
    type: string;
    location: string;
    reference: string;
    artist: number;
}

export interface IGetArtsRequestParams {
    artist?:string;
    limit?: number;
    offset?: number;
}

export interface IGetArtsResponse {
    count: number;
    results: IArt[];
}

export const getArts = async (params?: IGetArtsRequestParams) => {
    // const response = await axios.get<IGetArtsResponse>("/", {
    //     params: {
    //         limit: 6,
    //     },
    // });

    // return response.data.results;

    const response: IArt[] = [];

    for (let i = 1; i <= 23; i++) {
        const { default: art } = await import(`../public/assets/img/arts/${i}.jpg`);

        response.push({
            id: i,
            artist: 1,
            location: "iran",
            picture: art,
            reference: "https://google.com",
            title: "Some title",
            type: "oil",
            year: "1965",
        });
    }

    return response;
};
