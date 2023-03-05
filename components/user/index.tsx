import Avatar from "components/avatar";
import FollowButton from "components/follow-button";
import Link from "next/link";
import { IUserProps } from "./user.types";

const User: React.FC<IUserProps> = ({ id, avatar, title, type, underTitle, isFollowing }) => {
    const href = `/profile/${type}/${id}`;

    return (
        <div className="w-full flex justify-start items-center gap-4 h-[60px]">
            <Link href={href}>
                <Avatar picture={avatar} title={title} />
            </Link>
            <Link href={href} className="h-full w-[calc(100%-190px)] flex flex-col justify-center items-start text-white">
                <span className="text-[18px]">{title}</span>
                <span className="text-[rgb(150,150,150)] text-[16px]">{underTitle}</span>
            </Link>
            <FollowButton id={id} type={type} width={100} colorClass="profile" initial={isFollowing} />
        </div>
    );
};

export default User;
