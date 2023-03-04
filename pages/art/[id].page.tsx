import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getArt } from "api/arts.api";
import { useArtQuery } from "hooks/use-art";
import useHideOverflow from "hooks/use-hide-overflow";
import PageTransition from "layouts/page-transition";
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TArtPageUrlParams } from "./art.types";
import Arts from "./components/arts";
import Background from "./components/background";
import Fullscreen from "./components/fullscreen";
import Cookies from "universal-cookie";
import { getSession } from "next-auth/react";

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
            <main className="w-full h-screen">
                <Background picture={art?.image.url} />

                <Fullscreen />

                {windowHeight !== 0 && (
                    <div className="relative z-[40] bg-black min-[520px]:bg-transparent">
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
