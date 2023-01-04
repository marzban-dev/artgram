import { getSession } from "next-auth/react";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

export const checkServerSideAuth = async (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: "/auth/signin",
                permanent: false,
            },
        };
    }

    return session;
};
