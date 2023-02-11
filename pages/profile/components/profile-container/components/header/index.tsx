import Avatar from "components/avatar";
import Placeholder from "components/placeholder";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import UserBackground from "public/assets/img/arts/21.jpg";
import { Fragment, useMemo, useState } from "react";
import ProfileInfo from "./components/profile-info";
import { IHeaderProps } from "./header.types";

const Header: React.FC<IHeaderProps> = ({ avatar, info, name, background }) => {
    const [isLoaded, setIsLoaded] = useState(true);

    const renderProfileInfos = useMemo(() => {
        return info.map((profInfo) => <ProfileInfo {...profInfo} />);
    }, [info]);

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
                    <div className="w-full h-full absolute bg-profile-background-gradient z-20" />
                    <Image
                        src={background ? background : UserBackground}
                        style={{ objectFit: "cover" }}
                        onLoadingComplete={() => setIsLoaded(true)}
                        alt="background"
                        quality={100}
                        fill
                    />
                </motion.div>
            </div>
            <div className="flex justify-start items-end relative left-[35px] bottom-[65px] z-30">
                <Avatar
                    width={100}
                    height={100}
                    picture={avatar}
                    title={name}
                    className="overflow-hidden shadow-xl shadow-[rgba(0,0,0,0.15)]"
                    placeholderClassName="border border-[rgb(40,40,40)]"
                    square
                />
                <div className="pl-6 flex items-start flex-col gap-4">
                    <div>
                        <span className="text-white font-semibold text-[20px]">{name}</span>
                    </div>
                    <div className="flex justify-start items-center gap-4">{renderProfileInfos}</div>
                </div>
            </div>
        </Fragment>
    );
};

export default Header;
