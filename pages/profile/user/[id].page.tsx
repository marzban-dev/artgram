import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getUserProfile } from "api/user.api";
import { useUserQuery } from "hooks/use-user";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import CalenderIcon from "public/assets/icon/calendar-star.svg";
import LinkIcon from "public/assets/icon/link.svg";
import LocationIcon from "public/assets/icon/location-dot.svg";
import { Fragment, useMemo } from "react";
import ProfileContainer from "../components/profile-container";
import { TUserPageProps } from "./user.types";

const UserPage: NextPage = () => {
    const { query } = useRouter();
    const { data: userData, isLoading } = useUserQuery(String(query.id));

    const profileInfo = useMemo(() => {
        if (userData) {
            return [
                { icon: LocationIcon, text: userData.location },
                { icon: CalenderIcon, text: new Date(userData.date_joined).toDateString() },
                { icon: LinkIcon, text: "https://pornhub.com" },
            ];
        }
        return null;
    }, [userData]);

    return userData && profileInfo ? (
        <Fragment>
            <Head>
                <title>User - @{userData.username}</title>
                <meta name="description" content={userData.bio ? userData.bio : userData.username} />
            </Head>
            <ProfileContainer
                username={userData.username}
                firstName={userData.first_name}
                avatar={userData.profile_img}
                description={userData.bio}
                background={userData.header_img}
                isFollowing={userData.following}
                profileInfo={profileInfo}
                followers={userData.followers_count}
                following={userData.followings_count}
                followingArtists={userData.artist_followings_count}
                isFetching={isLoading}
                type="user"
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

export const getStaticProps: GetStaticProps<any, TUserPageProps> = async (context) => {
    const queryClient = new QueryClient();

    const userId = String(context.params!.id);

    try {
        const userProfile = await getUserProfile({ id: userId });
        await queryClient.prefetchQuery(["user", userId], () => userProfile);

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

export default UserPage;
