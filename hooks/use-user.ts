import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "apis/user.api";

export const useUserQuery = (id: string) => {
    return useQuery(["user", id], () => getUserProfile({ id }));
};
