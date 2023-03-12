import { useUpdateSettings } from "hooks/use-update-settings";
import { useUserQuery } from "hooks/use-user";
import { useSession } from "next-auth/react";
import GearIcon from "public/assets/icon/gear.svg";
import { Fragment, useCallback, useMemo, useState } from "react";
import ActionButton from "../action-button";
import SettingsModal from "./components/settings-modal";

const SettingsButton: React.FC = () => {
    const { data: authData } = useSession();
    const { data: userData } = useUserQuery(authData!.user.username);

    const { mutateAsync } = useUpdateSettings();
    const [showSettings, setShowSettings] = useState(false);

    const userUpdatableData = useMemo(() => {
        return {
            first_name: userData?.first_name ?? "",
            last_name: userData?.last_name ?? "",
            bio: userData?.bio ?? "",
            location: userData?.location ?? "",
            link: userData?.link ?? "",
        };
    }, [userData]);

    const sendUpdateRequest = useCallback(
        async (newSettings: object) => {
            if (JSON.stringify(userUpdatableData) !== JSON.stringify(newSettings)) {
                console.log("Updating ...");
                await mutateAsync(newSettings);
                console.log("Updated");
            }
        },
        [userUpdatableData]
    );

    return (
        <Fragment>
            <SettingsModal
                show={showSettings}
                setShow={setShowSettings}
                userData={userUpdatableData}
                sendUpdateRequest={sendUpdateRequest}
            />
            <ActionButton action={() => setShowSettings(true)} icon={GearIcon} />
        </Fragment>
    );
};

export default SettingsButton;
