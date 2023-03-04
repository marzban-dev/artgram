export interface IInfoProps {
    id: string;
    followers: number;
    following?: number;
    followingArtists?: number;
    username: string;
    type: "user" | "artist";
}
