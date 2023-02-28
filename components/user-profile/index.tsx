import Avatar from "components/avatar";
import { useNotificationsQuery } from "hooks/use-notifications";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const UserProfile: React.FC = () => {
    const { data } = useSession();
    const { data: notifications } = useNotificationsQuery({ enabled: true });

    const isThereNewNotification = useMemo(() => {
        if (notifications) {
            const lastNotifications = notifications.pages.at(-1)!;
            return notifications && lastNotifications.count !== 0 && lastNotifications.items[0].is_read === false;
        }

        return false;
    }, [notifications]);

    return (
        <div className="relative flex justify-center items-center">
            {isThereNewNotification && (
                <div className="absolute right-[-14px] w-[6px] h-[6px] rounded-full bg-red-500 z-10" />
            )}
            <Avatar className="w-[28px] h-[28px]" picture={data!.user.profile_img} title={data!.user.username} />
        </div>
    );
};
export default UserProfile;
