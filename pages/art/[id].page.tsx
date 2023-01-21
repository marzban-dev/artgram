import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getArt } from "api/arts.api";
import { useArtQuery } from "hooks/use-art";
import { useArtsQuery } from "hooks/use-arts";
import PagePadding from "layouts/page-padding";
import PageTransition from "layouts/page-transition";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { TArtPageUrlParams } from "./art.types";
import ArtPost from "./components/art-post";
import Fullscreen from "./components/fullscreen";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "components/spinner";

const ArtPage: NextPage = () => {
    const { query } = useRouter();
    const { data: art } = useArtQuery(Number(query.id));
    const { data: arts, fetchNextPage } = useArtsQuery(Number(query.id));

    const renderArts = useMemo(() => {
        return arts?.pages.flat().map((art) => {
            return <ArtPost {...art} key={art.id} />;
        });
    }, [arts]);

    return (
        <PageTransition>
            <PagePadding>
                <main className="w-full h-screen">
                    <Fullscreen />

                    <InfiniteScroll
                        className="w-full flex justify-start items-center flex-col gap-10 pt-[50px]"
                        dataLength={arts ? arts.pages.flat().length : 1}
                        next={fetchNextPage}
                        hasMore={true}
                        loader={<Spinner size={40} style={{ padding: "50px 0" }} />}
                        scrollThreshold={1}
                    >
                        {art && <ArtPost {...art} priority />}
                        {renderArts}
                    </InfiniteScroll>
                </main>
            </PagePadding>
        </PageTransition>
    );
};

export const getStaticPaths: GetStaticPaths<TArtPageUrlParams> = async () => {
    return {
        fallback: "blocking",
        paths: [],
    };
};

export const getStaticProps: GetStaticProps<any, TArtPageUrlParams> = async (context) => {
    const queryClient = new QueryClient();

    const artId = Number(context.params!.id);

    try {
        const art = await getArt({ id: artId });
        await queryClient.prefetchQuery(["art", artId], () => art);
    } catch (e) {
        return {
            notFound: true,
        };
    }

    return {
        revalidate: 60,
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default ArtPage;
