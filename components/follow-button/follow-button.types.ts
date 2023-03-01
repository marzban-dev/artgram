export interface IFollowButtonProps {
    id: string;
    type: "user" | "artist";
    width: number | string;
    initial: boolean;
    colorClass: "art" | "profile";
    showLoading ?: boolean;
}
