import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence } from "framer-motion";
import useRouteLoading from "hooks/use-route-loading";
import PageLoading from "layouts/page-loading";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Toaster, DefaultToastOptions } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "store";
import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

export default function App({ Component, pageProps }: AppProps) {
    const { pathname } = useRouter();
    const isRouteLoading = useRouteLoading();
    const queryClient = useRef(new QueryClient());

    const toastOptions: DefaultToastOptions = {
        position: "bottom-center",
        style: {
            borderRadius: "5px",
            background: "#1c1c1c",
            color: "#fff",
            padding: "10px 20px",
        },
    };

    return (
        <Provider store={store}>
            <SessionProvider session={pageProps.session}>
                <QueryClientProvider client={queryClient.current}>
                    <Hydrate state={pageProps.dehydratedState}>
                        <SkeletonTheme baseColor="rgb(28,28,28)" highlightColor="rgb(40,40,40)">
                            <AnimatePresence mode="wait" initial={false}>
                                {isRouteLoading ? <PageLoading key={1} /> : <Component key={pathname} {...pageProps} />}
                            </AnimatePresence>
                            <Toaster toastOptions={toastOptions} position="bottom-center" reverseOrder={false} />
                        </SkeletonTheme>
                    </Hydrate>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </SessionProvider>
        </Provider>
    );
}
