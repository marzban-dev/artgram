import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getArts } from "api/arts.api";
import MasonryGrid from "components/masonry-grid";
import Spinner from "components/spinner";
import { useExplore } from "hooks/use-explore";
import PagePadding from "layouts/page-padding";
import PageTransition from "layouts/page-transition";
import { GetServerSideProps, NextPage } from "next";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Art from "./components/art";

const ExplorePage: NextPage = () => {
    const { data: arts, fetchNextPage } = useExplore();

    const renderArts = useMemo(() => {
        return arts!.pages.flat().map((art, index) => <Art {...art} key={art.id} />);
    }, [arts]);

    return (
        <PageTransition>
            <PagePadding>
                <main className="h-screen">
                    {arts && (
                        <InfiniteScroll dataLength={arts.pages.flat().length} next={fetchNextPage} hasMore={true} loader={<Spinner size={40} style={{ padding: "50px 0" }} />}>
                            <MasonryGrid>{renderArts}</MasonryGrid>
                        </InfiniteScroll>
                    )}
                </main>
            </PagePadding>
        </PageTransition>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();

    const isRequestFromRouter = context.req.url?.includes("_next");

    if (!isRequestFromRouter) {
        await queryClient.prefetchInfiniteQuery(["explore"], () => getArts({ limit: 18 }));

        return {
            props: {
                dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
            },
        };
    } else {
        return { props: {} };
    }
};

export default ExplorePage;
