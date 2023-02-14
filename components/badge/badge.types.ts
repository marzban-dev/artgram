export interface IBadgeProps {
    id: string;
    onSelect: (id: any) => void;
    selected: boolean;
    text: string;
    icon?: any;
    iconSize?: number;
}
