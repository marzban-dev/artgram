import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getArt } from "api/arts.api";

export const useArtQuery = (id: number) => {
    const queryClient = useQueryClient();

    return useQuery(["art", id], () => getArt({ id }), {
        initialData: () => {
            // const cachedArts = queryClient.getQueryData<IArt[]>(["explore"]);

            // const art = cachedArts?.find((art) => art.id === id);

            // if (art) return art;
            return undefined;
        },
    });
};
