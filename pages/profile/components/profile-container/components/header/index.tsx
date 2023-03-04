import Avatar from "components/avatar";
import FollowButton from "components/follow-button";
import useImageColors from "hooks/use-image-colors";
import { Fragment, useEffect } from "react";
import setCssVariables from "utils/set-css-variables";
import Background from "./components/background";
import Info from "./components/info";
import Username from "./components/username";
import { IHeaderProps } from "./header.types";

const Header: React.FC<IHeaderProps> = ({
    id,
    avatar,
    username,
    firstName,
    background,
    isFollowing,
    type,
    isFetching,
    followers,
    following,
    followingArtists,
}) => {
    const imageColors = useImageColors(`#artist-background`, {
        darkPrimary: 0.2,
        // darkLighter: 0.6,
        lightPrimary: 0.1,
        // lightLighter: 0.2,
    });

    useEffect(() => {
        if (imageColors) {
            setCssVariables(`#profile-container`, [
                ["--profile-primary-color", imageColors.primary],
                ["--profile-lighter-color", imageColors.lighter],
            ]);
        }
    }, [imageColors]);

    return (
        <Fragment>
            <Background username={username} background={background} />
            <div className="flex justify-center min-[660px]:justify-start items-center min-[661px]:items-end max-[660px]:flex-col gap-4 min-[750px]:gap-6 relative px-[25px] min-[950px]:px-[35px] bottom-[65px] min-[661px]:bottom-[35px] z-30">
                <Avatar
                    picture={avatar}
                    title={username}
                    className="w-[100px] h-[100px] overflow-hidden shadow-xl shadow-[rgba(0,0,0,0.15)]"
                    placeholderClassName="border border-[rgb(40,40,40)]"
                    square
                />
                <div className="flex justify-center min-[660px]:justify-between items-center min-[661px]:items-end max-[660px]:flex-col gap-5 min-[661px]:gap-1 w-[calc(100%-120px)]">
                    <div className="flex items-start flex-col gap-1">
                        <Username firstName={firstName} username={username} />
                        <Info
                            id={id}
                            followers={followers}
                            following={following}
                            followingArtists={followingArtists}
                            username={username}
                            type={type}
                        />
                    </div>
                    <FollowButton
                        id={id}
                        initial={isFollowing}
                        type={type}
                        width={120}
                        colorClass="profile"
                        showLoading={isFetching}
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default Header;
