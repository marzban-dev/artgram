import { getSession } from "next-auth/react";

const createAuthHeader = async (req?: any) => {
    const session = await getSession();

    if (session) {
        return {
            Authorization: `Bearer ${session.accessToken}`,
        };
    }

    return {};
};

export default createAuthHeader;
