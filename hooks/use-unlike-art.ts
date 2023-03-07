import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unlikeArt } from "apis/arts.api";

export const useUnlikeArtMutation = (id: number) => {
    const queryClient = useQueryClient();
    const key = ["art-likes-count", id];

    return useMutation({
        mutationFn: unlikeArt,
        onMutate: async () => {
            await queryClient.cancelQueries();
            const prevQueryData = queryClient.getQueryData(key);

            queryClient.setQueryData<number>(key, (prevQueryData) => {
                if (prevQueryData !== undefined) return prevQueryData - 1;
                return prevQueryData;
            });

            return { prevQueryData };
        },
        onError: (_err, _data, ctx) => {
            queryClient.setQueryData(key, ctx!.prevQueryData);
        },
        onSettled: () => {
            queryClient.invalidateQueries(key);
        },
    });
};
