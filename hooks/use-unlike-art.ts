import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { unlikeArt } from "api/arts.api";
import { IArtLike } from "api/arts.types";
import { useSession } from "next-auth/react";

export const useUnlikeArtMutation = (id: number) => {
    const { data: authedUser } = useSession();
    const queryClient = useQueryClient();
    const key = ["art-likes", id];

    return useMutation({
        mutationFn: unlikeArt,
        onMutate: async () => {
            await queryClient.cancelQueries();
            const prevQueryData = queryClient.getQueryData(key);

            queryClient.setQueryData<InfiniteData<{ count: number; next: string | null; items: IArtLike[] }>>(
                key,
                (prevQueryData) => {
                    if (prevQueryData !== undefined) {
                        const newPagesArray = prevQueryData.pages.map((page) => {
                            const artLikeIndex = page.items.findIndex(
                                (artLike) => artLike.owner.username === authedUser?.user.username
                            );

                            if (artLikeIndex) {
                                const copyOfItems = page.items;
                                copyOfItems.splice(artLikeIndex, 1);

                                return {
                                    items: copyOfItems,
                                    count: page.count - 1,
                                    next: page.next,
                                };
                            } else return page;
                        });

                        return {
                            pages: newPagesArray,
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
