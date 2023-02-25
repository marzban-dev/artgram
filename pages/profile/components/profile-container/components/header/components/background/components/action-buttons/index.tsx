import { useSession } from "next-auth/react";
import { IActionButtonsProps } from "./action-buttons.types";
import NotificationsButton from "./components/notifications-button";
import SettingsButton from "./components/settings-button";
import { memo } from "react";

const ActionButtons: React.FC<IActionButtonsProps> = ({ username }) => {
    const { status, data } = useSession();
    const isOwner = status === "authenticated" && data.user.username === username;

    return isOwner ? (
        <div className="absolute top-[10px] right-[10px] flex justify-center items-center gap-4 z-30 py-2 px-4 rounded-[35px] bg-[rgba(20,20,20,0.7)]">
            <NotificationsButton />
            <SettingsButton />
        </div>
    ) : null;
};
export default memo(ActionButtons);
