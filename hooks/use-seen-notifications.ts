import { useMutation } from "@tanstack/react-query";
import { seenNotifications } from "api/user.api";

export const useSeenNotificationsMutation = () => {
    return useMutation({
        mutationFn: seenNotifications,
    });
};
