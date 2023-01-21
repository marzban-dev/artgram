import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeArt } from "api/arts.api";

export const useLikeArt = (id: number) => {
    const queryClient = useQueryClient();
    const key = ["art-likes", id];  

    return useMutation({
        mutationFn: likeArt,
        onMutate: async () => {
            await queryClient.cancelQueries();
            const prevQueryData = queryClient.getQueryData(key);

            queryClient.setQueryData<number>(key, (prevQueryData) => {
                if (prevQueryData) return prevQueryData + 1;
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
