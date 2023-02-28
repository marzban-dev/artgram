import { Fragment, memo } from "react";
import Followers from "./components/followers";
import Following from "./components/following";
import { IInfoProps } from "./info.types";

const Info: React.FC<IInfoProps> = ({ id, followers, following, username, type }) => {
    return (
        <div className="flex justify-start items-center gap-2">
            <span className="text-[rgb(160,160,160)] font-semibold text-[14px] whitespace-nowrap">@{username}</span>
            <span className="w-[4px] h-[4px] rounded-full bg-profile-primary" />
            <Followers id={id} type={type} initial={followers} />
            {following !== undefined && (
                <Fragment>
                    <span className="w-[4px] h-[4px] rounded-full bg-profile-primary" />
                    <Following id={id} type={type} initial={following} />
                </Fragment>
            )}
        </div>
    );
};

export default memo(Info);
