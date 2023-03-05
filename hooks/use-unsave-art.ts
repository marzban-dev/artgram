import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unsaveArt } from "api/arts.api";

export const useUnsaveArtMutation = () => {
    const queryClient = useQueryClient();
    const key = ["user-saves"];

    return useMutation({
        mutationFn: unsaveArt,
        onMutate: async (data) => {
            await queryClient.cancelQueries();
            const prevQueryData = queryClient.getQueryData(key);

            queryClient.setQueryData<number[]>(key, (prevQueryData) => {
                if (prevQueryData) return prevQueryData.filter((artId) => artId !== data.id);
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
