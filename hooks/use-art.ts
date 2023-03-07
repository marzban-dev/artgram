import { useQuery } from "@tanstack/react-query";
import { getArt } from "apis/arts.api";

export const useArtQuery = (id: number) => {
    return useQuery(["art", id], () => getArt({ id }));
};
