import UserProfile from "components/user-profile";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar: React.FC = () => {
    const { status, data } = useSession();

    return (
        <nav>
            <ul className="flex justify-start items-center gap-4 min-[550px]:gap-8">
                <Link href="/" className="text-white text-[14px] min-[550px]:text-[16px]">
                    Explore
                </Link>
                <Link href="/request" className="text-white text-[14px] min-[550px]:text-[16px]">
                    Request Artist
                </Link>
                {status === "authenticated" ? (
                    <Link href={`/profile/user/${data.user.username}`}>
                        <UserProfile />
                    </Link>
                ) : (
                    <Link href="/auth/signin" className="text-white text-[14px] min-[550px]:text-[16px]">
                        Signin
                    </Link>
                )}
            </ul>
        </nav>
    );
};
export default Navbar;
