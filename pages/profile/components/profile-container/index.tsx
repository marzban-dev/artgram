import PagePadding from "layouts/page-padding";
import PageTransition from "layouts/page-transition";
import { useRouter } from "next/router";
import { SkeletonTheme } from "react-loading-skeleton";
import ArtistArts from "./components/artist-arts";
import Description from "./components/description";
import Header from "./components/header";
import PageBackground from "./components/page-background";
import UserArts from "./components/user-arts";
import { IProfileContainerProps } from "./profile-container.types";
import { useMemo } from "react";
import ProfileInfo from "./components/profile-info";

const ProfileContainer: React.FC<IProfileContainerProps> = ({
    avatar,
    username,
    firstName,
    background,
    description,
    isFollowing,
    profileInfo,
    type,
}) => {
    const { query } = useRouter();
    const profileId = query.id;

    const renderProfileInfos = useMemo(() => {
        return profileInfo.map((profInfo) => <ProfileInfo {...profInfo} />);
    }, [profileInfo]);

    return (
        <SkeletonTheme baseColor="rgb(22,22,22)" highlightColor="rgb(32,32,32)">
            <PageTransition>
                <PagePadding>
                    <main
                        className="w-full rounded-[25px] bg-[rgb(65,65,65,0.3)] relative z-20 my-[100px] backdrop-blur-sm p-6"
                        id="profile-container"
                    >
                        <div className="w-full">
                            <Header
                                id={String(profileId)}
                                avatar={avatar}
                                username={username}
                                firstName={firstName}
                                background={background}
                                isFollowing={isFollowing}
                                type={type}
                            />
                            <div className="relative bottom-[12px]">
                                <div className="flex justify-start items-center gap-3 px-[35px] mb-4">
                                    {renderProfileInfos}
                                </div>
                                {description && <Description text={description} />}
                            </div>
                        </div>
                        {type === "artist" && <ArtistArts id={Number(profileId)} />}
                        {type === "user" && <UserArts id={String(profileId)} />}
                    </main>
                </PagePadding>
                <PageBackground background={background} />
            </PageTransition>
        </SkeletonTheme>
    );
};

export default ProfileContainer;
