import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { Hydrate, QueryClient, QueryKey } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientOptions, PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import AppProvider from "providers/app-provider";
import { useEffect, useRef, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { Provider } from "react-redux";
import store from "store";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
    const [persisterStorage, setPersisterStorage] = useState<Storage | undefined>(undefined);

    useEffect(() => {
        setPersisterStorage(window.localStorage);
    }, []);

    const queryClient = useRef(
        new QueryClient({
            defaultOptions: {
                queries: {
                    cacheTime: 1000 * 60 * 60 * 24,
                },
            },
        })
    );

    const persister = createSyncStoragePersister({ storage: persisterStorage });

    // const doNotPersistQueries: QueryKey[] = [];

    const persistOptions: Omit<PersistQueryClientOptions, "queryClient"> = {
        persister,
        maxAge: 1000 * 60 * 60 * 24,
        hydrateOptions: undefined,
        // dehydrateOptions: {
        //     shouldDehydrateQuery: ({ queryKey }) => {
        //         return !doNotPersistQueries.includes(queryKey);
        //     },
        // },
    };

    return (
        <Provider store={store}>
            <SessionProvider session={pageProps.session}>
                {persisterStorage && (
                    <PersistQueryClientProvider client={queryClient.current} persistOptions={persistOptions}>
                        <Hydrate state={pageProps.dehydratedState}>
                            <AppProvider Component={Component} pageProps={pageProps} />
                        </Hydrate>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </PersistQueryClientProvider>
                )}
            </SessionProvider>
        </Provider>
    );
}
