import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unlikeArt } from "api/arts.api";

export const useUnlikeArtMutation = (id: number) => {
    const queryClient = useQueryClient();
    const key = ["art-likes", id];

    return useMutation({
        mutationFn: unlikeArt,
        onMutate: async () => {
            await queryClient.cancelQueries();
            const prevQueryData = queryClient.getQueryData(key);

            queryClient.setQueryData<{ likesCount: number; users: any[] }>(key, (prevQueryData) => {
                if (prevQueryData !== undefined) {
                    return {
                        likesCount: prevQueryData.likesCount - 1,
                        users: prevQueryData.users,
                    };
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
