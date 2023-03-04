export interface IUserProps {
    id: string;
    avatar: string;
    title: string;
    type: "user" | "artist";
    underTitle: string;
    isFollowing: boolean;
}
