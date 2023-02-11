import { IArt } from "api/arts.types";

export interface IInfiniteArtsProps {
    arts: IArt[];
    count: number;
    callback: () => void;
    className?: string;
}
