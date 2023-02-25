import { memo } from "react";
import { IUsernameProps } from "./username.types";

const Username: React.FC<IUsernameProps> = ({ firstName, username }) => {
    return (
        <div className="flex justify-center min-[661px]:justify-start items-end max-[660px]:w-full gap-3">
            <span className="text-white font-semibold text-[20px]">{firstName ? firstName : username}</span>
        </div>
    );
};

export default memo(Username);
