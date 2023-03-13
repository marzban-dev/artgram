import Avatar from "components/avatar";
import FollowButton from "components/follow-button";
import Link from "next/link";
import { IUserProps } from "./user.types";

const User: React.FC<IUserProps> = ({ id, avatar, title, type, underTitle, isFollowing }) => {
    const href = `/profile/${type}/${id}`;

    return (
        <div className="flex h-[60px] w-full items-center justify-start gap-2">
            <Link href={href}>
                <Avatar picture={avatar} title={title} />
            </Link>
            <Link
                href={href}
                className="flex h-full w-[calc(100%-180px)] flex-col items-start justify-center text-white"
            >
                <div className="w-[90%] text-[18px]">{title}</div>
                <div className="w-[90%] text-[16px] text-[rgb(150,150,150)]">{underTitle}</div>
            </Link>
            <FollowButton id={id} type={type} width={100} colorClass="profile" initial={isFollowing} />
        </div>
    );
};

export default User;
