import useImageColors from "hooks/use-image-colors";
import { useEffect } from "react";
import setCssVariables from "utils/set-css-variables";
import { IProfileInfoProps } from "./profile-info.types";

const ProfileInfo: React.FC<IProfileInfoProps> = ({ icon: Icon, text, link, iconSize = 18 }) => {
    const iconStyle: React.CSSProperties = {
        height: iconSize,
    };

    return (
        <span className="text-white flex justify-start items-center rounded-[30px] bg-[rgba(10,10,10,0.5)] px-4 py-[6px] gap-2">
            <Icon className="fill-profile-primary" style={iconStyle} />
            {link ? (
                <a
                    target="_blank"
                    href={link}
                    className="font-medium text-[rgb(160,160,160)]"
                    rel="noopener noreferrer"
                >
                    {text}
                </a>
            ) : (
                <span className="font-medium text-[rgb(160,160,160)]">{text}</span>
            )}
        </span>
    );
};

export default ProfileInfo;
