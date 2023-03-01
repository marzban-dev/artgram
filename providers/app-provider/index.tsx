import FloatNavbar from "components/float-navbar";
import { AnimatePresence } from "framer-motion";
import useRouteLoading from "hooks/use-route-loading";
import PageLoading from "layouts/page-loading";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { DefaultToastOptions, Toaster } from "react-hot-toast";
import { SkeletonTheme } from "react-loading-skeleton";
import { IAppProviderProps } from "./app-provider.types";

const AppProvider: React.FC<IAppProviderProps> = ({ Component, pageProps }) => {
    const { pathname } = useRouter();
    const isRouteLoading = useRouteLoading();

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
        <SkeletonTheme baseColor="rgb(28,28,28)" highlightColor="rgb(40,40,40)">
            <AnimatePresence mode="wait" initial={false}>
                {isRouteLoading ? (
                    <PageLoading key={1} />
                ) : (
                    <Fragment>
                        <Component key={pathname} {...pageProps} />
                        <FloatNavbar />
                    </Fragment>
                )}
            </AnimatePresence>
            <Toaster toastOptions={toastOptions} position="bottom-center" reverseOrder={false} />
        </SkeletonTheme>
    );
};
export default AppProvider;
