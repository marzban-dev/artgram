export interface IModalProps {
    title: string;
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
