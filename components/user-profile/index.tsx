import Avatar from "components/avatar";
import { useCheckNotifications } from "hooks/use-check-notifications";
import { useSession } from "next-auth/react";

const UserProfile: React.FC = () => {
    const { data } = useSession();
    const { data: isThereNewNotification } = useCheckNotifications(true);

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
