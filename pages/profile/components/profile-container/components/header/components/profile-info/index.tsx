import { IProfileInfoProps } from "./profile-info.types";

const ProfileInfo: React.FC<IProfileInfoProps> = ({ icon: Icon, text, link, iconSize }) => {
    const iconStyle: React.CSSProperties = {
        width: iconSize + "px",
    };

    return (
        <span className="text-white flex justify-start items-center gap-2">
            <Icon className="fill-white w-[15px]" style={iconStyle} />
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
