import classNames from "classnames";
import { useAnimation } from "framer-motion";
import { useFollowUserMutation } from "hooks/use-follow-user";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState, MouseEvent } from "react";
import { toast } from "react-hot-toast";
import { IFollowButtonProps } from "./follow-button.types";

const FollowButton: React.FC<IFollowButtonProps> = ({ id, type, width, initial, colorClass }) => {
    const { data, status } = useSession();
    const [isFollowed, setIsFollowed] = useState(initial);
    const { isError: isFollowError, mutateAsync: follow } = useFollowUserMutation();

    useEffect(() => {
        if (isFollowError) setIsFollowed(!isFollowed);
    }, [isFollowError]);

    useEffect(() => {
        setIsFollowed(initial);
    }, [initial]);

    const alertUserToLogin = () => {
        toast.dismiss();
        toast(
            <div>
                To like this art please
                <Link
                    href="/auth/signin"
                    onClick={() => toast.dismiss()}
                    className="text-blue-500 font-semibold pl-[6px]"
                >
                    signin
                </Link>
            </div>
        );
    };

    const onFollow = async (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (status === "authenticated") {
            setIsFollowed(!isFollowed);

            // api automatically detecting that is need to follow or unfollow the user
            await follow({ id, type });
        } else alertUserToLogin();
    };

    const buttonStyle: React.CSSProperties = {
        width,
    };

    const buttonClasses = classNames({
        "h-[38px] border-2 rounded-lg font-semibold w-full py-1 bg-transparent transition-all hover:text-white": 1,
        "border-art-primary text-art-primary hover:bg-art-primary": colorClass === "art",
        "border-profile-primary text-profile-primary hover:bg-profile-primary": colorClass === "profile",
    });

    return (
        <button className={buttonClasses} style={buttonStyle} onClick={onFollow}>
            {isFollowed ? "Unfollow" : "Follow"}
        </button>
    );
};

export default FollowButton;
