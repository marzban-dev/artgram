import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getArts } from "api/arts.api";
import InfiniteArts from "components/infinite-arts";
import { useExploreQuery } from "hooks/use-explore";
import PagePadding from "layouts/page-padding";
import PageTransition from "layouts/page-transition";
import { GetServerSideProps, NextPage } from "next";

const ExplorePage: NextPage = () => {
    const { data: arts, fetchNextPage } = useExploreQuery();

    return (
        <PageTransition>
            <PagePadding>
                <main className="h-screen">
                    {arts && <InfiniteArts arts={arts.pages.flat()} callback={fetchNextPage} count={Infinity} />}
                </main>
            </PagePadding>
        </PageTransition>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();

    const isRequestFromRouter = context.req.url?.includes("_next");

    if (!isRequestFromRouter) {
        await queryClient.prefetchInfiniteQuery(["explore"], () => getArts({ pageParam: { limit: 18 } }));

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
