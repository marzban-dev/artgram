import Avatar from "components/avatar";
import FollowButton from "components/follow-button";
import { IUserProps } from "./user.types";

const User: React.FC<IUserProps> = ({ id, avatar, title, type, underTitle, isFollowing }) => {
    return (
        <div className="w-full flex justify-start items-center gap-4 h-[60px] ">
            <Avatar picture={avatar} title={title} />
            <div className="h-full w-[calc(100%-190px)] flex flex-col justify-center items-start text-white">
                <span className="text-[18px]">{underTitle}</span>
                <span className="text-[rgb(150,150,150)] text-[16px]">{title}</span>
            </div>
            <FollowButton id={id} type={type} width={100} colorClass="profile" initial={isFollowing} />
        </div>
    );
};

export default User;
