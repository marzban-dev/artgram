import { NextComponentType, NextPageContext } from "next";

export interface IAppProviderProps {
    Component: NextComponentType<NextPageContext, any, any>;
    pageProps: any;
}
