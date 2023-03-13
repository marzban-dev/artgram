import { InfiniteData } from "@tanstack/react-query";
import { IArt } from "apis/arts.types";

export interface IArtsProps {
    id: number;
    art: IArt;
    containerHeight: number;
}
