import { useState, useEffect } from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getArt } from "api/arts.api";
import { useArtQuery } from "hooks/use-art";
import PagePadding from "layouts/page-padding";
import PageTransition from "layouts/page-transition";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
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
                    <Background picture={art?.picture} />

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

// export const getStaticPaths: GetStaticPaths<TArtPageUrlParams> = async () => {
//     return {
//         fallback: "blocking",
//         paths: [],
//     };
// };

export const getServerSideProps: GetServerSideProps<any, TArtPageUrlParams> = async (context) => {
    const session = await getSession({ req: context.req });
    const queryClient = new QueryClient();

    const artId = Number(context.params!.id);

    try {
        // const art = await getArt({ id: artId, token: session?.accessToken });
        await queryClient.prefetchQuery(["art", artId], () => {
            return {
                id: 7306,
                artist: {
                    id: 721,
                    name: "BRAY, Jan de",
                    wikipedia: "Jan de Bray",
                },
                title: "Bacchus",
                picture: "https://www.wga.hu/art/b/bray/jan/bacchus.jpg",
                year: "c. 1665",
                type: "Oil on panel, 23 x 18 cm",
                location: "Private collection",
                reference: "https://www.wga.hu/",
                likes_count: 1,
                user_like: true,
                user_repost: false,
            };
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
