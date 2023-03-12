import PagePadding from "layouts/page-padding";
import PageTransition from "layouts/page-transition";
import { NextPage } from "next";
import Head from "next/head";
import Navbar from "./components/navbar";

const OfflinePage: NextPage = () => {
    return (
        <PageTransition>
            <Head>
                <title>Offline Page</title>
                <meta name="description" content="Explore the world of arts and artists" />
            </Head>
            <main className="h-screen">
                <Navbar />
                <PagePadding>
                   <div className="bg-red-500 text-white">
                   You are in offline page
                   </div>
                </PagePadding>
            </main>
        </PageTransition>
    );
};

export default OfflinePage;
