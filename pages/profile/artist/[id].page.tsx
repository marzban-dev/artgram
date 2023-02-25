import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getArtistProfile } from "api/user.api";
import { useArtistQuery } from "hooks/use-artist";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import BrushIcon from "public/assets/icon/brush.svg";
import CalenderIcon from "public/assets/icon/calendar-star.svg";
import CapIcon from "public/assets/icon/graduation-cap.svg";
import { useMemo } from "react";
import ProfileContainer from "../components/profile-container";

const ArtistPage: NextPage = () => {
    const { query } = useRouter();
    const { data: artistData } = useArtistQuery(String(query.id));

    const profileInfo = useMemo(() => {
        return [
            { icon: CapIcon, text: artistData!.school },
            { icon: CalenderIcon, text: new Date(artistData!.birth_data).toDateString() },
            { icon: BrushIcon, text: artistData!.profession },
        ];
    }, [artistData]);

    return (
        <ProfileContainer
            isFollowing={false}
            username={artistData!.name}
            avatar={artistData!.image}
            description={artistData?.bio}
            background={undefined}
            profileInfo={profileInfo}
            followers={34}
            type="artist"
        />
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        fallback: "blocking",
        paths: [],
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const queryClient = new QueryClient();

    const artistId = String(context.params!.id);

    try {
        const artistProfile = await getArtistProfile({ id: artistId });

        await queryClient.prefetchQuery(["artist", artistId], () => artistProfile);
    } catch (e) {
        return {
            notFound: true,
        };
    }

    return {
        revalidate: 60,
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
    };
};

export default ArtistPage;
