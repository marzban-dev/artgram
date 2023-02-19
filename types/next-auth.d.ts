import { IUser } from "api/user.types";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: IUser;
        accessToken: string;
        refreshToken: string;
        expires: DefaultSession["expires"];
    }
}
