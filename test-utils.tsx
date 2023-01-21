import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import { ReactElement, useRef } from "react";

const Provider: React.FC<any> = ({ children }) => {
    const queryClient = useRef(new QueryClient());

    return <QueryClientProvider client={queryClient.current}>{children}</QueryClientProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) => {
    render(ui, { wrapper: Provider, ...options });
};

export * from "@testing-library/jest-dom";
export * from "@testing-library/react";
export { customRender as render };
