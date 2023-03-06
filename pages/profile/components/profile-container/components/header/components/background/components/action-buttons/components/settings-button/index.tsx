import { useSession } from "next-auth/react";
import GearIcon from "public/assets/icon/gear.svg";
import { Fragment, useEffect, useState } from "react";
import ActionButton from "../action-button";
import SettingsModal from "./components/settings-modal";

const SettingsButton: React.FC = () => {
    const { data } = useSession();
    const { first_name, last_name, bio, location, link } = data!.user;

    const [settings, setSettings] = useState<{ [x: string]: string }>({
        first_name: first_name ? first_name : "",
        last_name: last_name ? last_name : "",
        bio: bio ? bio : "",
        location: location ? location : "",
        link: link ? link : "",
    });

    const [showSettings, setShowSettings] = useState(false);

    const openSettings = () => {
        setShowSettings(true);
    };

    return (
        <Fragment>
            <SettingsModal
                show={showSettings}
                setShow={setShowSettings}
                settings={settings}
                setSettings={setSettings}
            />
            <ActionButton action={openSettings} icon={GearIcon} />
        </Fragment>
    );
};

export default SettingsButton;
