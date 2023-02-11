import Avatar from "components/avatar";
import { IUserProps } from "./user.types";

const User: React.FC<IUserProps> = ({ avatar, firstName, username }) => {
    return (
        <div className="w-full flex justify-start items-center gap-4 h-[60px]">
            <Avatar width={60} height={60} picture={avatar} title={username} />
            <div className="h-full flex flex-col justify-center items-start text-white">
                <span className="text-[18px]">{firstName}</span>
                <span className="text-[rgb(150,150,150)] text-[16px]">{username}</span>
            </div>
        </div>
    );
};

export default User;
