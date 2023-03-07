import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getArt } from "apis/arts.api";
import BackButton from "components/back-button";
import { useArtQuery } from "hooks/use-art";
import useHideOverflow from "hooks/use-hide-overflow";
import PageTransition from "layouts/page-transition";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { TArtPageUrlParams } from "./art.types";
import Arts from "./components/arts";
import Background from "./components/background";
import Fullscreen from "./components/fullscreen";

const ArtPage: NextPage = () => {
    const { query } = useRouter();
    const { data: art } = useArtQuery(Number(query.id));
    const [windowHeight, setWindowHeight] = useState(0);
    useHideOverflow();

    useEffect(() => {
        const divElement = document.querySelector("#full-height-element") as HTMLDivElement;
        if (window.innerWidth < 520) {
            setWindowHeight(divElement.clientHeight - 50);
        } else setWindowHeight(divElement.clientHeight);
    }, []);

    return (
        <PageTransition>
            <Head>
                <title>Art - {art!.title}</title>
                <meta name="description" content={`Art ${art!.title} by ${art!.artist.name}`} />
            </Head>
            <main className="h-screen w-full">
                <Background picture={art?.image.url} />

                <Fullscreen />

                {windowHeight !== 0 && (
                    <div className="relative z-[900] bg-black min-[520px]:bg-transparent">
                        <div className="fixed top-[20px] left-[20px] z-[900] flex h-[50px] items-center justify-start gap-4 bg-black px-[20px] max-[520px]:top-0 max-[520px]:left-0 max-[520px]:w-full min-[520px]:rounded-[30px]">
                            <BackButton />
                            <h2 className="text-[18px] text-white">Arts</h2>
                        </div>
                        <Arts id={Number(query.id)} art={art!} containerHeight={windowHeight} />
                    </div>
                )}
            </main>
        </PageTransition>
    );
};

export const getServerSideProps: GetServerSideProps<any, TArtPageUrlParams> = async (context) => {
    const session = await getSession({ req: context.req });
    const queryClient = new QueryClient();

    const artId = Number(context.params!.id);

    const cookies = new Cookies(context.req.headers.cookie);
    const cachedArt = cookies.get(`art-${artId}`);

    try {
        if (!cachedArt) {
            const art = await getArt({ id: artId, token: session?.accessToken });
            await queryClient.prefetchQuery(["art", artId], () => art);
        } else {
            await queryClient.prefetchQuery(["art", artId], () => cachedArt);
        }

        return {
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

export default ArtPage;
