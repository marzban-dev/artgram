import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getArt } from "api/arts.api";
import { useArtQuery } from "hooks/use-art";
import PageTransition from "layouts/page-transition";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
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

    useEffect(() => {
        setWindowHeight(window.innerHeight);
    }, []);

    return (
        <PageTransition>
            <main className="w-full h-screen">
                <Background picture={art!.image.url} />

                <Fullscreen />

                {windowHeight !== 0 && (
                    <div className="relative z-[40]">
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

    try {
        const art = await getArt({ id: artId, token: session?.accessToken });
        await queryClient.prefetchQuery(["art", artId], () => {
            return art;
            // return {
            //     id: 7306,
            //     artist: {
            //         id: 909,
            //         name: "CAPORALI, Bartolomeo",
            //         image: "https://www.wga.hu/biojpg/c/caporali/biograph.jpg",
            //         following: false,
            //     },
            //     title: "Annunciation",
            //     date: "1467-68",
            //     technique: "Tempera, oil and gold on panel, 50 x 48 cm (each)",
            //     location: "Galleria Nazionale dell'Umbria, Perugia",
            //     image: {
            //         id: 7306,
            //         url: "https://www.wga.hu/art/c/caporali/annuncia.jpg",
            //         width: 1629,
            //         height: 800,
            //         thumbnail: "https://www.wga.hu/preview/c/caporali/annuncia.jpg",
            //     },
            //     form: "painting",
            //     school: "Italian",
            //     type: "religious",
            //     reference: "www.wga.hu",
            //     likes_count: 1,
            //     user_like: true,
            //     user_repost: false,
            // };
        });
    } catch (e) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default ArtPage;
