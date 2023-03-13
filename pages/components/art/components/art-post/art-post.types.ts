import { IArt } from "apis/arts.types";

export interface IArtPostProps extends IArt {
    priority?: boolean;
}
