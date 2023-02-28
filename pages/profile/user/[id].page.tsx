import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getUserProfile } from "api/user.api";
import { useUserQuery } from "hooks/use-user";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import CalenderIcon from "public/assets/icon/calendar-star.svg";
import LinkIcon from "public/assets/icon/link.svg";
import LocationIcon from "public/assets/icon/location-dot.svg";
import { useMemo } from "react";
import ProfileContainer from "../components/profile-container";

const UserPage: NextPage = () => {
    const { query } = useRouter();
    const { data: userData } = useUserQuery(String(query.id));

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
            type="user"
        />
    ) : null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();

    const userId = String(context.params!.id);

    const isRequestFromRouter = context.req.url?.includes("_next");

    if (!isRequestFromRouter) {
        try {
            const userProfile = await getUserProfile({ id: userId });
            await queryClient.prefetchQuery(["user", userId], () => userProfile);

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

export default UserPage;
