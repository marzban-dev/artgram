import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getArt } from "api/arts.api";
import { useArtQuery } from "hooks/use-art";
import useHideOverflow from "hooks/use-hide-overflow";
import PageTransition from "layouts/page-transition";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
    const queryClient = new QueryClient();

    const artId = Number(context.params!.id);

    const isRequestFromRouter = context.req.url?.includes("_next");

    if (!isRequestFromRouter) {
        try {
            const art = await getArt({ id: artId });
            await queryClient.prefetchQuery(["art", artId], () => art);

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
    }

    return { props: {} };
};

export default ArtPage;
