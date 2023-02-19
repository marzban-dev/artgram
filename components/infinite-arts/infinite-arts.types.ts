import { IArt } from "api/arts.types";

export interface IInfiniteArtsProps {
    arts: IArt[];
    hasNextPage: boolean;
    callback: () => void;
    className?: string;
}
