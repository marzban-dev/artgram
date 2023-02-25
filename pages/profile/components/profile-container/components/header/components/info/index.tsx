import { Fragment, memo } from "react";
import { IInfoProps } from "./info.types";

const Info: React.FC<IInfoProps> = ({ followers, following, username }) => {
    return (
        <div className="flex justify-start items-center gap-2">
            <span className="text-[rgb(160,160,160)] font-semibold text-[14px]">@{username}</span>
            <span className="w-[4px] h-[4px] rounded-full bg-profile-primary" />
            <span className="text-[rgb(160,160,160)] font-semibold text-[14px] whitespace-nowrap">
                Followers <span className="text-white"> {followers}</span>
            </span>
            {following && (
                <Fragment>
                    <span className="w-[4px] h-[4px] rounded-full bg-profile-primary" />
                    <span className="text-[rgb(160,160,160)] font-semibold text-[14px] whitespace-nowrap">
                        Following <span className="text-white"> {following}</span>
                    </span>
                </Fragment>
            )}
        </div>
    );
};

export default memo(Info);
