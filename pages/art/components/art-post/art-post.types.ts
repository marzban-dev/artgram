import { IArt } from "api/arts.types";

export interface IArtPostProps extends IArt {
    priority?: boolean;
}
