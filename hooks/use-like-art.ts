import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { likeArt } from "api/arts.api";
import { IArtLike } from "api/arts.types";

export const useLikeArtMutation = (id: number) => {
    const queryClient = useQueryClient();
    const key = ["art-likes", id];

    return useMutation({
        mutationFn: likeArt,
        onMutate: async () => {
            await queryClient.cancelQueries();
            const prevQueryData = queryClient.getQueryData(key);

            queryClient.setQueryData<InfiniteData<{ count: number; next: string | null; items: IArtLike[] }>>(
                key,
                (prevQueryData) => {
                    if (prevQueryData !== undefined) {
                        const copyOfPagesArray = prevQueryData.pages;
                        copyOfPagesArray.at(-1)!.count += 1;

                        return {
                            pages: copyOfPagesArray,
                            pageParams: prevQueryData.pageParams,
                        };
                    }
                    return prevQueryData;
                }
            );

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
