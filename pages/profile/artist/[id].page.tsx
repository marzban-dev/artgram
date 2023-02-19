import { dehydrate, QueryClient } from "@tanstack/react-query";
import { IGetArtistProfileResponse } from "api/user.types";
import { useArtistQuery } from "hooks/use-artist";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import CalenderIcon from "public/assets/icon/calendar-star.svg";
import BrushIcon from "public/assets/icon/brush.svg";
import CapIcon from "public/assets/icon/graduation-cap.svg";
import ProfileContainer from "../components/profile-container";
import { useMemo } from "react";
import { getArtistProfile } from "api/user.api";

const ArtistPage: NextPage = () => {
    const { query } = useRouter();
    const { data: artistData } = useArtistQuery(String(query.id));

    const profileInfo = useMemo(() => {
        return [
            { icon: CapIcon, text: artistData!.school },
            { icon: CalenderIcon, text: artistData!.birth_data },
            { icon: BrushIcon, text: artistData!.profession },
        ];
    }, [artistData]);

    return (
        <ProfileContainer
            username={artistData!.name}
            avatar={artistData!.image}
            description={artistData?.bio}
            background={undefined}
            profileInfo={profileInfo}
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
