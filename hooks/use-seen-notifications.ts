import { useMutation } from "@tanstack/react-query";
import { seenNotifications } from "apis/user.api";

export const useSeenNotificationsMutation = () => {
    return useMutation({
        mutationFn: seenNotifications,
    });
};
