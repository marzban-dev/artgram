import PageTransition from "layouts/page-transition";
import { GetServerSideProps, NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { checkServerSideAuth } from "utils/check-server-side-auth";
import sleep from "utils/sleep";

const Home: NextPage = () => {
    const { status } = useSession();

    return (
        <PageTransition>
            <main className="flex justify-center items-center w-full bg-black h-screen">
                <div className="text-white">{status}</div>
                <Link href="/auth/signin" className="border-2 border-yellow-400 p-4 text-white">
                    Go To Other Page
                </Link>
                <button
                    onClick={() => signOut({ redirect: true })}
                    className="text-white border-2 border-white p-2 m-2"
                >
                    Exit
                </button>
            </main>
        </PageTransition>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await checkServerSideAuth(context);
    await sleep(500);
    return {
        props: {
            session,
        },
    };
};

export default Home;
