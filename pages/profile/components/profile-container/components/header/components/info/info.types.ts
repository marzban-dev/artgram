export interface IInfoProps {
    followers: number;
    following?: number;
    username: string;
    type: "user" | "artist";
}
