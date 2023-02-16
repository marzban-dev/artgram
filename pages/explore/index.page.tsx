import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getArts } from "api/arts.api";
import PagePadding from "layouts/page-padding";
import PageTransition from "layouts/page-transition";
import { GetServerSideProps, NextPage } from "next";
import Navbar from "./components/navbar";
import Search from "./components/search";
import ShowExplore from "./components/show-explore";
import ShowSearch from "./components/show-search";

const ExplorePage: NextPage = () => {
    return (
        <PageTransition>
            <main className="h-screen">
                <Navbar />
                <Search />
                <PagePadding>
                    <ShowExplore />
                    <ShowSearch />
                </PagePadding>
            </main>
        </PageTransition>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();

    const isRequestFromRouter = context.req.url?.includes("_next");

    if (!isRequestFromRouter) {
        await queryClient.prefetchInfiniteQuery(["explore"], () => getArts({ pageParam: { limit: 15 } }));

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
