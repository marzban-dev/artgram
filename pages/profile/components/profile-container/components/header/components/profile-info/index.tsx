import useImageColors from "hooks/use-image-colors";
import { useEffect } from "react";
import setCssVariables from "utils/set-css-variables";
import { IProfileInfoProps } from "./profile-info.types";

const ProfileInfo: React.FC<IProfileInfoProps> = ({ icon: Icon, text, link, iconSize = 18 }) => {
    const imageColors = useImageColors(`#artist-background`, {
        darkPrimary: 0.2,
        // darkLighter: 0.6,
        lightPrimary: 0.1,
        // lightLighter: 0.2,
    });

    useEffect(() => {
        if (imageColors) {
            setCssVariables(`#profile-container`, [
                ["--artist-primary-color", imageColors.primary],
                ["--artist-lighter-color", imageColors.lighter],
            ]);
        }
    }, [imageColors]);

    const iconStyle: React.CSSProperties = {
        height: iconSize,
    };

    return (
        <span className="text-white flex justify-start items-center gap-2">
            <Icon className="fill-artist-primary" style={iconStyle} />
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
