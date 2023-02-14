export interface IBadgeProps {
    id: string;
    onSelect: (id: string) => void;
    selected: boolean;
    text: string;
    icon?: any;
    iconSize?: number;
}
