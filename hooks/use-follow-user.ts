import { useMutation } from "@tanstack/react-query";
import { followUser } from "api/user.api";

export const useFollowUserMutation = () => {
    return useMutation({ mutationFn: followUser });
};
