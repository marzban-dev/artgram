export interface IActionOverlayProps {
    showActions: boolean;
    id: number;
    user_like: boolean;
    setIsLiked: (isLiked: boolean) => void;
}
