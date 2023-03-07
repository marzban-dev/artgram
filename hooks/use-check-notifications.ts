import { useQuery } from "@tanstack/react-query";
import { checkNotifications } from "apis/user.api";

export const useCheckNotifications = (enabled: boolean = false) => {
    return useQuery(["new-notifications"], checkNotifications, { enabled });
};
