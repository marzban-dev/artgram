import Avatar from "components/avatar";
import Placeholder from "components/placeholder";
import { AnimatePresence, motion } from "framer-motion";
import useImageColors from "hooks/use-image-colors";
import { useSession } from "next-auth/react";
import Image from "next/image";
import UserBackground from "public/assets/img/arts/21.jpg";
import { Fragment, useState } from "react";
import setCssVariables from "utils/set-css-variables";
import Info from "./components/info";
import NotificationsButton from "./components/notifications-button";
import SettingsButton from "./components/settings-button";
import { IHeaderProps } from "./header.types";
import { useEffect } from "react";
import FollowButton from "components/follow-button";

const Header: React.FC<IHeaderProps> = ({ id, avatar, username, firstName, background, isFollowing, type }) => {
    const { status, data } = useSession();
    const [isLoaded, setIsLoaded] = useState(true);

    const isOwner = status === "authenticated" && data.user.username === username;

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
            <div className="w-full h-[200px] rounded-[15px] overflow-hidden bg-[rgb(22,22,22)]">
                <AnimatePresence>
                    {!isLoaded && (
                        <Placeholder
                            width="100%"
                            height="100%"
                            borderRadius={15}
                            className="border border-[rgb(40,40,40)]"
                        />
                    )}
                </AnimatePresence>
                <motion.div animate={{ opacity: isLoaded ? 1 : 0 }} className="relative w-full h-full">
                    {isOwner && (
                        <div className="absolute top-[10px] right-[10px] flex justify-center items-center gap-4 z-30 py-2 px-4 rounded-[35px] bg-[rgba(20,20,20,0.7)]">
                            <NotificationsButton />
                            <SettingsButton />
                        </div>
                    )}
                    <div className="w-full h-full absolute bg-profile-background-gradient z-20" />
                    <Image
                        id="artist-background"
                        src={background ? background : UserBackground}
                        style={{ objectFit: "cover" }}
                        onLoadingComplete={() => setIsLoaded(true)}
                        alt="background"
                        quality={100}
                        fill
                    />
                </motion.div>
            </div>
            <div className="flex justify-start items-end gap-6 relative px-[35px] bottom-[35px] z-30">
                <Avatar
                    width={100}
                    height={100}
                    picture={avatar}
                    title={username}
                    className="overflow-hidden shadow-xl shadow-[rgba(0,0,0,0.15)]"
                    placeholderClassName="border border-[rgb(40,40,40)]"
                    square
                />
                <div className="flex justify-between items-center gap-1 w-[calc(100%-120px)]">
                    <div className="flex items-start flex-col gap-1">
                        <div className="flex justify-start items-end gap-3">
                            <span className="text-white font-semibold text-[20px]">
                                {firstName ? firstName : username}
                            </span>
                        </div>
                        <Info followers={203} following={43} username={username} />
                    </div>
                    <FollowButton id={id} initial={isFollowing} type={type} width={120} colorClass="profile" />
                </div>
            </div>
        </Fragment>
    );
};

export default Header;
