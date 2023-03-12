import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings } from "apis/user.api";
import { IUser } from "apis/user.types";
import { useSession } from "next-auth/react";

export const useUpdateSettings = () => {
    const { data: authData } = useSession();
    const queryClient = useQueryClient();

    const profileKey = ["user", authData!.user.username];

    return useMutation({
        mutationFn: updateSettings,
        onMutate: async (newData) => {
            await queryClient.cancelQueries();
            const prevQueryData = queryClient.getQueryData(profileKey);

            queryClient.setQueryData<IUser>(profileKey, (prevQueryData) => {
                if (prevQueryData) return { ...prevQueryData, ...newData };
                return prevQueryData;
            });

            return { prevQueryData };
        },
        onError: (_err, _data, ctx) => {
            queryClient.setQueryData(profileKey, ctx!.prevQueryData);
        },
        onSettled: () => {
            queryClient.invalidateQueries(profileKey);
        },
    });
};
