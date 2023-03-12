import Avatar from "components/avatar";
import FollowButton from "components/follow-button";
import TextOverflowAnimation from "components/text-overflow-animation";
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
                <div className="w-[90%]">
                    <TextOverflowAnimation className="px-2 text-[18px]">
                        {title}
                    </TextOverflowAnimation>
                </div>
                <div className="w-[90%]">    
                    <TextOverflowAnimation className="px-2 text-[16px] text-[rgb(150,150,150)]">
                        {underTitle}
                    </TextOverflowAnimation>
                </div>
            </Link>
            <FollowButton id={id} type={type} width={100} colorClass="profile" initial={isFollowing} />
        </div>
    );
};

export default User;
