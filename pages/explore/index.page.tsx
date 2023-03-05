import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getArts } from "api/arts.api";
import PagePadding from "layouts/page-padding";
import PageTransition from "layouts/page-transition";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Navbar from "./components/navbar";
import Search from "./components/search";
import ShowExplore from "./components/show-explore";
import ShowSearch from "./components/show-search";

const ExplorePage: NextPage = () => {
    return (
        <PageTransition>
            <Head>
                <title>Explore</title>
                <meta name="description" content="Explore the world of arts and artists" />
            </Head>
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const queryClient = new QueryClient();

//     try {
//         await queryClient.prefetchInfiniteQuery(["explore"], () => getArts({ pageParam: { limit: 4 } }));

//         return {
//             props: {
//                 dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//             },
//         };
//     } catch (e) {
//         return {
//             notFound: true,
//         };
//     }
// };

export default ExplorePage;
