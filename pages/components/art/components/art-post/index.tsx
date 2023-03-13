import Avatar from "components/avatar";
import FollowButton from "components/follow-button";
import Like from "components/like";
import useImageColors from "hooks/use-image-colors";
import { useEffect, useRef } from "react";
import setCssVariables from "utils/set-css-variables";
import { IArtPostProps } from "./art-post.types";
import ArtDetail from "./components/art-detail";
import ArtPicture from "./components/art-picture";
import Bookmark from "./components/bookmark";
import DownloadButton from "./components/download-button";
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
    }, [imageColors, id]);

    return (
        <section className="flex w-full snap-none items-center justify-center last:mb-[30px] min-[520px]:mt-[30px]">
            <div
                className="w-full overflow-hidden bg-black py-4 min-[520px]:max-w-[450px] min-[520px]:rounded-2xl min-[520px]:bg-[rgb(20,20,20)] min-[800px]:max-w-[550px]"
                id={`art-container-${id}`}
                ref={artContainer}
            >
                <div className="flex w-full items-center justify-between px-5">
                    <Header title={title} artist={artist} year={date} />

                    <FollowButton
                        id={String(artist.id)}
                        type="artist"
                        width={100}
                        initial={artist.following}
                        colorClass="art"
                    />
                </div>
                <div className="relative mt-4 w-full">
                    <ArtPicture
                        id={id}
                        title={title}
                        picture={image.url}
                        width={image.width}
                        height={image.height}
                        priority={priority}
                    />
                    <ArtDetail
                        id={id}
                        location={location}
                        type={type}
                        form={form}
                        school={school}
                        technique={technique}
                    />
                </div>
                <div className="flex items-center justify-between px-5 pt-4">
                    <div className="flex items-center justify-start gap-3">
                        <div className="flex items-center justify-center">
                            <Like id={id} initial={user_like} />
                        </div>
                        <LikesCount id={id} initial={likes_count} />
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <DownloadButton name={title + ".jpg"} id={id} />
                        <Bookmark id={id} initial={user_repost} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ArtPost;
