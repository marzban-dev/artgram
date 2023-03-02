import PagePadding from "layouts/page-padding";
import PageTransition from "layouts/page-transition";
import { useRouter } from "next/router";
import { SkeletonTheme } from "react-loading-skeleton";
import ArtistArts from "./components/artist-arts";
import Description from "./components/description";
import Header from "./components/header";
import PageBackground from "./components/page-background";
import ProfileInfos from "./components/profile-infos";
import UserArts from "./components/user-arts";
import { IProfileContainerProps } from "./profile-container.types";

const ProfileContainer: React.FC<IProfileContainerProps> = ({
    avatar,
    username,
    firstName,
    background,
    description,
    isFollowing,
    profileInfo,
    followers,
    following,
    isFetching,
    type,
}) => {
    const { query } = useRouter();
    const profileId = query.id;

    return (
        <SkeletonTheme baseColor="rgb(22,22,22)" highlightColor="rgb(32,32,32)">
            <PageTransition>
                <PagePadding>
                    <main
                        className="w-full min-[750px]:rounded-[25px] bg-[rgb(55,55,55,0.3)] min-[750px]:bg-[rgb(65,65,65,0.3)] relative z-20 min-[750px]:my-[100px] backdrop-blur-[1px] min-[750px]:backdrop-blur-sm min-[661px]:px-6 min-[661px]:pt-6 pb-[100px]"
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
                                followers={followers}
                                following={following}
                                isFetching={isFetching}
                                type={type}
                            />
                            <div className="relative bottom-[40px] min-[661px]:bottom-[12px] max-[660px]:px-3">
                                <ProfileInfos infos={profileInfo} />
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
