import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveArt } from "api/arts.api";

export const useSaveArtMutation = () => {
    const queryClient = useQueryClient();
    const key = ["user-saves"];

    return useMutation({
        mutationFn: saveArt,
        onMutate: async (data) => {
            await queryClient.cancelQueries();
            const prevQueryData = queryClient.getQueryData(key);

            queryClient.setQueryData<number[]>(key, (prevQueryData) => {
                if (prevQueryData) {
                    if (!prevQueryData.find((artId) => artId === data.id)) {
                        return [...prevQueryData, data.id];
                    }
                }

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
