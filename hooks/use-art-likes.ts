import { useQuery } from "@tanstack/react-query";
import { getArtLikes } from "api/arts.api";

export const useArtLikesQuery = (id: number, initialData: number = 0) => {
    return useQuery(["art-likes", id], () => getArtLikes({ id }), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        initialData: {
            likesCount: initialData,
            users: [],
        },
    });
};
