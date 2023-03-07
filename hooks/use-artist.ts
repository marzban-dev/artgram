import { useQuery } from "@tanstack/react-query";
import { getArtistProfile } from "apis/user.api";

export const useArtistQuery = (id: number) => {
    return useQuery(["artist", id], () => getArtistProfile({ id: String(id) }));
};
