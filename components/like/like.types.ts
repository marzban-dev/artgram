export interface ILikeProps {
    id: number;
    initial: boolean;
    size?: number;
    onLikeCallback?: () => void;
    onDislikeCallback?: () => void;
}
