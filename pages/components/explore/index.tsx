import PagePadding from "layouts/page-padding";
import PageTransition from "layouts/page-transition";
import Head from "next/head";
import Header from "./components/header";
import Navbar from "./components/navbar";
import ShowExplore from "./components/show-explore";
import ShowSearch from "./components/show-search";

const Explore: React.FC = () => {
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

export default Explore;
