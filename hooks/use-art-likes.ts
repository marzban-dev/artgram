import { useQuery } from "@tanstack/react-query";
import { getArtLikes } from "api/arts.api";

export const useArtLikes = (id: number) => {
    return useQuery(["art-likes", id], () => getArtLikes({ id }));
};
