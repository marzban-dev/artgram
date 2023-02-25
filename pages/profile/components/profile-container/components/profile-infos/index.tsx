import { memo, useMemo } from "react";
import ProfileInfo from "./components/profile-info";
import { IProfileInfosProps } from "./profile-infos.types";

const ProfileInfos: React.FC<IProfileInfosProps> = ({ infos }) => {

    const renderProfileInfos = useMemo(() => {
        return infos.map((info, index) => <ProfileInfo {...info} key={index} />);
    }, [infos]);

    return (
        <div className="flex justify-start items-center flex-wrap gap-2 min-[750px]:gap-3 px-[10px] min-[661px]:px-[25px] min-[950px]:px-[35px] mb-4">
            {renderProfileInfos}
        </div>
    );
};

export default memo(ProfileInfos);
