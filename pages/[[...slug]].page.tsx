import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getArt } from "apis/arts.api";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import ArtPage from "./components/art";
import Explore from "./components/explore";
import { THomePageUrlParams } from "./index.types";

const ExplorePage: NextPage = () => {
    const router = useRouter();
    const isExplore = Object.keys(router.query).length === 0;
    const artId = router.query.slug ? Number(router.query.slug![1]) : undefined;

    if (isExplore) return <Explore />;
    return artId ? <ArtPage id={artId} /> : null;
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        fallback: "blocking",
        paths: [],
    };
};

export const getStaticProps: GetStaticProps<any, THomePageUrlParams> = async (context) => {
    const queryClient = new QueryClient();

    const slug = context.params?.slug;

    // if there are no url params like (/art/1234) return explore props
    if (!slug) {
        return {
            props: {},
        };
    }

    // if there are url params but its more than 2 params or its not a valid param, redirect to notfound page
    if (slug && (slug[0] !== "art" || slug.length > 2)) {
        return {
            notFound: true,
        };
    }

    const artId = Number(slug[1]);

    try {
        const art = await getArt({ id: artId });
        await queryClient.prefetchQuery(["art", artId], () => art);

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

export default ExplorePage;
