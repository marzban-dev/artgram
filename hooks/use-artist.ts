import { useQuery } from "@tanstack/react-query";
import { getArtistProfile } from "api/user.api";

export const useArtistQuery = (id: string) => {
    return useQuery(["artist", id], () => getArtistProfile({ id }));
};
