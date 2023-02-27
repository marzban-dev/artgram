import { useQuery } from "@tanstack/react-query";
import { getArtistProfile } from "api/user.api";

export const useArtistQuery = (id: number) => {
    return useQuery(["artist", id], () => getArtistProfile({ id: String(id) }));
};
