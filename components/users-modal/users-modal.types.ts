import { InfiniteData } from "@tanstack/react-query";
import { ISimpleUser } from "api/user.types";

export interface IUsersModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
    title: string;
    fetchNextPage: () => void;
    hasNextPage: boolean | undefined;
    users: JSX.Element[];
}
