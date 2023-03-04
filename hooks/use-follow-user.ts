import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IArt, IArtist } from "api/arts.types";
import { followUser } from "api/user.api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const useFollowUserMutation = (profileId: string, type: "user" | "artist") => {
    const router = useRouter();
    const { data: authData, status } = useSession();
    const queryClient = useQueryClient();

    const castedProfileId = type === "artist" ? Number(profileId) : profileId;

    const profileKey = [type, castedProfileId];
    const artKey = router.pathname.includes("/art/") ? ["art", Number(router.query.id)] : undefined;
    const profileFollowersKey = ["followers", castedProfileId];
    const userProfileFollowingKey = status === "authenticated" ? ["following", authData.user.username] : undefined;
    const userProfileArtistsKey =
        status === "authenticated" ? ["following-artists", authData.user.username] : undefined;

    return useMutation({
        mutationFn: followUser,
        onMutate: async () => {
            await queryClient.cancelQueries();
            const prevProfileQueryData = queryClient.getQueryData(profileKey);
            const prevArtQueryData = artKey ? queryClient.getQueryData(artKey) : undefined;

            // Change following state of target profile
            queryClient.setQueryData<IArtist>(profileKey, (prevQueryData) => {
                if (prevQueryData) {
                    return {
                        ...prevQueryData,
                        following: !prevQueryData.following,
                    };
                }
                return prevQueryData;
            });

            // Change following state of target art-post
            if (artKey) {
                queryClient.setQueryData<IArt>(artKey, (prevQueryData) => {
                    if (prevQueryData) {
                        return {
                            ...prevQueryData,
                            artist: {
                                ...prevQueryData.artist,
                                following: !prevQueryData.artist.following,
                            },
                        };
                    }
                    return prevQueryData;
                });
            }

            return { prevArtQueryData, prevProfileQueryData };
        },
        onError: (_err, _data, ctx) => {
            queryClient.setQueryData(profileKey, ctx!.prevProfileQueryData);
            if (artKey) queryClient.setQueryData(artKey, ctx!.prevArtQueryData);
        },
        onSettled: () => {
            // Invalidate profile
            queryClient.invalidateQueries(profileKey);

            // If user inside art page and he did follow action, then invalidate art too
            if (artKey) queryClient.invalidateQueries(artKey);
            queryClient.invalidateQueries(profileFollowersKey);

            // Invalidate authenticated user following and artists
            if (userProfileFollowingKey) {
                queryClient.invalidateQueries(userProfileFollowingKey);
                queryClient.invalidateQueries([userProfileFollowingKey[0] + "-count", userProfileFollowingKey[1]]);
            }
            if (userProfileArtistsKey) {
                queryClient.invalidateQueries(userProfileArtistsKey);
                queryClient.invalidateQueries([userProfileArtistsKey[0] + "-count", userProfileArtistsKey[1]]);
            }
        },
    });
};
