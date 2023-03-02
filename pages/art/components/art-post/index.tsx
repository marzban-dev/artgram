import Avatar from "components/avatar";
import FollowButton from "components/follow-button";
import Like from "components/like";
import useImageColors from "hooks/use-image-colors";
import LocationIcon from "public/assets/icon/location-dot.svg";
import BrushIcon from "public/assets/icon/paintbrush.svg";
import { useEffect, useRef } from "react";
import setCssVariables from "utils/set-css-variables";
import { IArtPostProps } from "./art-post.types";
import ArtDetail from "./components/art-detail";
import ArtPicture from "./components/art-picture";
import Bookmark from "./components/bookmark";
import Header from "./components/header";
import LikesCount from "./components/likes-count";

const ArtPost: React.FC<IArtPostProps> = ({
    id,
    title,
    image,
    artist,
    location,
    type,
    date,
    form,
    school,
    technique,
    priority,
    likes_count,
    user_like,
    user_repost,
}) => {
    const artContainer = useRef(null);

    const imageColors = useImageColors(`#art-${id}`, {
        darkPrimary: 0.8,
        // darkLighter: 0.6,
        lightPrimary: 0.1,
        // lightLighter: 0.2,
    });

    useEffect(() => {
        if (imageColors) {
            setCssVariables(`#art-container-${id}`, [
                ["--art-primary-color", imageColors.primary],
                ["--art-lighter-color", imageColors.lighter],
            ]);
        }
    }, [imageColors]);

    return (
        <section className="w-full flex justify-center items-center min-[520px]:mt-[30px] snap-center last:mb-[30px]">
            <div
                className="w-full min-[520px]:max-w-[450px] min-[800px]:max-w-[550px] overflow-hidden py-4 bg-black min-[520px]:bg-[rgb(20,20,20)] min-[520px]:rounded-2xl"
                id={`art-container-${id}`}
                ref={artContainer}
            >
                <div className="w-full flex justify-between items-center px-5">
                    <Header title={title} artist={artist} year={date} />

                    <FollowButton
                        id={String(artist.id)}
                        type="artist"
                        width={100}
                        initial={artist.following}
                        colorClass="art"
                    />
                </div>
                <div className="w-full mt-4 relative">
                    <ArtPicture
                        id={id}
                        title={title}
                        picture={image.url}
                        width={image.width}
                        height={image.height}
                        priority={priority}
                    />
                    <div className="flex justify-center items-start flex-col absolute z-20 bottom-[16px] left-[18px] gap-2">
                        <ArtDetail id={id} icon={BrushIcon} text={type} iconSize={14} />
                        <ArtDetail id={id} icon={LocationIcon} text={location} iconSize={10} />
                    </div>
                </div>
                <div className="flex justify-between items-center px-5 pt-4">
                    <div className="flex justify-start items-center gap-3">
                        <div className="flex justify-center items-center">
                            <Like id={id} initial={user_like} />
                        </div>
                        <LikesCount id={id} initial={likes_count} />
                    </div>
                    <div className="flex justify-center items-center">
                        <Bookmark id={id} initial={user_repost} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ArtPost;
