import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser } from "api/user.api";

export const useFollowUserMutation = (id: number | string) => {
    const queryClient = useQueryClient();
    const key = ["user-followers", id];

    return useMutation({
        mutationFn: followUser,
        onMutate: async () => {
            await queryClient.cancelQueries();
            const prevQueryData = queryClient.getQueryData(key);

            queryClient.setQueryData<number>(key, (prevQueryData) => {
                if (prevQueryData) return prevQueryData - 1;
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
