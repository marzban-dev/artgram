export interface ISettingsModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
    userData: {
        first_name: string;
        last_name: string;
        bio: string;
        location: string;
        link: string;
    };
    sendUpdateRequest: (newSettings: object) => void;
}
