export interface ILikeProps {
    id: number;
    initial: boolean;
    onLikeCallback?: () => void;
    onDislikeCallback?: () => void;
}
