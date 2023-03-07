import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getArtistProfile } from "apis/user.api";
import { useArtistQuery } from "hooks/use-artist";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import BrushIcon from "public/assets/icon/brush.svg";
import CalenderIcon from "public/assets/icon/calendar-star.svg";
import CapIcon from "public/assets/icon/graduation-cap.svg";
import { Fragment, useMemo } from "react";
import ProfileContainer from "../components/profile-container";
import { TArtistPageProps } from "./artist.types";

const ArtistPage: NextPage = () => {
    const { query } = useRouter();
    const { data: artistData, isLoading } = useArtistQuery(Number(query.id));

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
        <Fragment>
            <Head>
                <title>Artist - {artistData.name}</title>
                <meta name="description" content={artistData.bio} />
            </Head>
            <ProfileContainer
                isFollowing={artistData.following}
                username={artistData.name}
                avatar={artistData.image}
                description={artistData?.bio}
                background={undefined}
                profileInfo={profileInfo}
                isFetching={isLoading}
                followers={0}
                type="artist"
            />
        </Fragment>
    ) : null;
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        fallback: "blocking",
        paths: [],
    };
};

export const getStaticProps: GetStaticProps<any, TArtistPageProps> = async (context) => {
    const queryClient = new QueryClient();

    const artistId = String(context.params!.id);

    try {
        const artistProfile = await getArtistProfile({ id: artistId });
        await queryClient.prefetchQuery(["artist", Number(artistId)], () => artistProfile);

        return {
            revalidate: 60,
            props: {
                dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
            },
        };
    } catch (e) {
        return {
            notFound: true,
        };
    }
};

export default ArtistPage;
