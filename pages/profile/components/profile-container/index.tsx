import Likes from "components/likes";
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

const ProfileContainer: React.FC<IProfileContainerProps> = ({
    avatar,
    name,
    background,
    description,
    artsCount,
    profileInfo,
    type,
}) => {
    const { query } = useRouter();
    const artistId = query.id;

    return (
        <SkeletonTheme baseColor="rgb(22,22,22)" highlightColor="rgb(32,32,32)">
            <PageTransition>
                <PagePadding>
                    <main className="w-full rounded-[25px] bg-[rgb(65,65,65,0.3)] relative z-20 mt-[100px] backdrop-blur-sm p-6">
                        <div className="w-full">
                            <Header avatar={avatar} name={name} background={background} info={profileInfo} />
                            {description && <Description text={description} />}
                        </div>
                        {type === "artist" && <ArtistArts id={Number(artistId)} count={artsCount} />}
                        {type === "user" && <UserArts id={Number(artistId)} count={artsCount} />}
                    </main>
                </PagePadding>
                <PageBackground background={background} />
            </PageTransition>
        </SkeletonTheme>
    );
};

export default ProfileContainer;
