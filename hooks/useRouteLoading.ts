import Router from "next/router";
import { useEffect, useState } from "react";

const useRouteLoading = () => {
    const [isLoading, setIsLoading] = useState(false);

    const start = () => setIsLoading(true);
    const end = () => setIsLoading(false);

    useEffect(() => {
        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);
        return () => {
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        };
    }, []);

    return isLoading;
};

export default useRouteLoading;
