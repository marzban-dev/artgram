import { InfiniteData } from "@tanstack/react-query";
import { IArt } from "api/arts.types";

export interface IArtsProps {
    id: number;
    art: IArt;
    containerHeight: number;
}
