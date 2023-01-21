import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            username: string;
            email: string;
        };
        accessToken: string;
        refreshToken: string;
        expires: DefaultSession["expires"];
    }
}
