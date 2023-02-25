import Avatar from "components/avatar";
import FollowButton from "components/follow-button";
import { useMemo } from "react";
import { INotificationProps } from "./notification.types";

const Notification: React.FC<INotificationProps> = ({ id, avatar, username, type, isFollowing }) => {
    const message = useMemo(() => {
        if (type === "f") return "started following you.";
    }, [type]);

    return (
        <div className="w-full flex justify-start items-center gap-4 h-[60px]">
            <Avatar width={60} height={60} picture={avatar} title={username} />
            <div className="h-full w-[calc(100%-190px)] flex flex-col justify-center items-start text-white">
                <span className="text-[18px]">{username}</span>
                <span className="text-[rgb(150,150,150)] text-[16px]">{message}</span>
            </div>
            <FollowButton id={id} type="user" width={100} colorClass="profile" initial={isFollowing} />
        </div>
    );
};

export default Notification;
