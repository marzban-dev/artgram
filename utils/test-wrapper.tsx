import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";

const TestWrapper: React.FC<any> = ({ children }) => {
    const queryClient = useRef(
        new QueryClient({
            logger: {
                log: console.log,
                warn: console.warn,
                error: () => {},
            },
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        })
    );

    return <QueryClientProvider client={queryClient.current}>{children}</QueryClientProvider>;
};

export default TestWrapper;
