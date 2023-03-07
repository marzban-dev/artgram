import PagePadding from "layouts/page-padding";
import PageTransition from "layouts/page-transition";
import { NextPage } from "next";
import Head from "next/head";
import Navbar from "./components/navbar";
import Header from "./components/header";
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
                <Header />
                <PagePadding>
                    <ShowExplore />
                    <ShowSearch />
                </PagePadding>
            </main>
        </PageTransition>
    );
};

export default ExplorePage;
