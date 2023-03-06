export interface ISettingsModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
    settings: { [x: string]: string };
    setSettings: (settings: { [x: string]: string }) => void;
}
