import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import AppProvider from "providers/app-provider";
import { useRef } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { Provider } from "react-redux";
import store from "store";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
    const queryClient = useRef(new QueryClient());

    return (
        <Provider store={store}>
            <SessionProvider session={pageProps.session}>
                <QueryClientProvider client={queryClient.current}>
                    <Hydrate state={pageProps.dehydratedState}>
                        <AppProvider Component={Component} pageProps={pageProps} />
                    </Hydrate>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </SessionProvider>
        </Provider>
    );
}
