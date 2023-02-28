import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getArtistProfile } from "api/user.api";
import { useArtistQuery } from "hooks/use-artist";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import BrushIcon from "public/assets/icon/brush.svg";
import CalenderIcon from "public/assets/icon/calendar-star.svg";
import CapIcon from "public/assets/icon/graduation-cap.svg";
import { useMemo } from "react";
import ProfileContainer from "../components/profile-container";

const ArtistPage: NextPage = () => {
    const { query } = useRouter();
    const { data: artistData } = useArtistQuery(Number(query.id));

    const profileInfo = useMemo(() => {
        if (artistData) {
            return [
                { icon: CapIcon, text: artistData.school },
                { icon: CalenderIcon, text: artistData.birth_data },
                { icon: BrushIcon, text: artistData.profession },
            ];
        }
        return null;
    }, [artistData]);

    return artistData && profileInfo ? (
        <ProfileContainer
            isFollowing={artistData.following}
            username={artistData.name}
            avatar={artistData.image}
            description={artistData?.bio}
            background={undefined}
            profileInfo={profileInfo}
            followers={34}
            type="artist"
        />
    ) : null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();

    const artistId = String(context.params!.id);

    const isRequestFromRouter = context.req.url?.includes("_next");

    if (!isRequestFromRouter) {
        try {
            const artistProfile = await getArtistProfile({ id: artistId });
            await queryClient.prefetchQuery(["artist", Number(artistId)], () => artistProfile);

            return {
                props: {
                    dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
                },
            };
        } catch (e) {
            return {
                notFound: true,
            };
        }
    }

    return { props: {} };
};

export default ArtistPage;
