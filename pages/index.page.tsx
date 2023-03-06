import PagePadding from "layouts/page-padding";
import PageTransition from "layouts/page-transition";
import { NextPage } from "next";
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

export default ExplorePage;
