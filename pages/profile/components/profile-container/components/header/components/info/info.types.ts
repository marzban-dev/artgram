export interface IInfoProps {
    id: string;
    followers: number;
    following?: number;
    username: string;
    type: "user" | "artist";
}
