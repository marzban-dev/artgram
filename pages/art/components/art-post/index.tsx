import Like from "components/like";
import { motion, useInView } from "framer-motion";
import useImageColors from "hooks/use-image-colors";
import LocationIcon from "public/assets/icon/location-dot.svg";
import BrushIcon from "public/assets/icon/paintbrush.svg";
import { useEffect, useRef } from "react";
import { IArtPostProps } from "./art-post.types";
import ArtDetail from "./components/art-detail";
import ArtPicture from "./components/art-picture";
import Avatar from "./components/avatar";
import FollowButton from "./components/follow-button";
import Header from "./components/header";
import LikesCount from "./components/likes-count";

const ArtPost: React.FC<IArtPostProps> = ({ id, title, picture, artist, location, type, year, priority }) => {
    const artContainer = useRef(null);
    const isInView = useInView(artContainer, { once: true });

    const imageColors = useImageColors(`#art-${id}`, {
        darkPrimary: 0.8,
        // darkLighter: 0.6,
        lightPrimary: 0.1,
        // lightLighter: 0.2,
    });

    useEffect(() => {
        if (imageColors) {
            const artContainer = document.querySelector(`#art-container-${id}`) as HTMLElement;
            artContainer.style.setProperty("--art-primary-color", imageColors.primary);
            artContainer.style.setProperty("--art-lighter-color", imageColors.lighter);
        }
    }, [imageColors]);

    return (
        <motion.section
            className="max-w-[550px] w-full py-4 bg-[rgba(20,20,20,1)] rounded-2xl"
            id={`art-container-${id}`}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            ref={artContainer}
        >
            <div className="w-full flex justify-between items-center px-4">
                <div className="flex justify-start items-center gap-4 w-[calc(100%_-_100px)]">
                    <Avatar title={artist.name + " artist"} />
                    <Header title={title} artist={artist.name} year={year} />
                </div>
                <FollowButton />
            </div>
            <div className="w-full mt-4 relative">
                <ArtPicture id={id} title={title} picture={picture} priority={priority} />
                <div className="flex justify-center items-start flex-col absolute z-20 bottom-[16px] left-[16px] gap-2">
                    <ArtDetail id={id} icon={BrushIcon} text={type} iconSize={14} />
                    <ArtDetail id={id} icon={LocationIcon} text={location} iconSize={10} />
                </div>
            </div>
            <div className="flex justify-between items-center px-4 pt-4">
                <LikesCount count={23452} />
                <div>
                    <Like id={id} />
                </div>
            </div>
        </motion.section>
    );
};

export default ArtPost;
