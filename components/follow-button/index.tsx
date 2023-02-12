import { useAnimation } from "framer-motion";
import { useFollowUserMutation } from "hooks/use-follow-user";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState, MouseEvent } from "react";
import { toast } from "react-hot-toast";
import { IFollowButtonProps } from "./follow-button.types";

const FollowButton: React.FC<IFollowButtonProps> = ({ id, type, width, initial }) => {
    const { data, status } = useSession();
    const [isFollowed, setIsFollowed] = useState(initial);
    const { isError: isFollowError, mutateAsync: follow } = useFollowUserMutation();

    useEffect(() => {
        if (isFollowError) setIsFollowed(!isFollowed);
    }, [isFollowError]);

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

            if (isFollowed) null;
            else await follow({ id, state: true, type, token: data!.accessToken });
        } else alertUserToLogin();
    };

    const buttonStyle: React.CSSProperties = {
        width,
    };

    return (
        <button
            className="h-[38px] border-2 border-art-primary rounded-lg text-art-primary font-semibold w-full py-1 bg-transparent hover:text-white hover:bg-art-primary transition-all"
            style={buttonStyle}
            onClick={onFollow}
        >
            {isFollowed ? "Unfollow" : "Follow"}
        </button>
    );
};

export default FollowButton;
