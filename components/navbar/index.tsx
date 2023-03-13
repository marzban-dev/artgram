import UserProfile from "components/user-profile";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar: React.FC = () => {
    const { status, data } = useSession();

    return (
        <nav>
            <ul className="flex items-center justify-start gap-4 min-[550px]:gap-8">
                <Link href="/" className="text-[14px] text-white min-[550px]:text-[16px]">
                    Explore
                </Link>
                <Link href="/request" className="text-[14px] text-white min-[550px]:text-[16px]">
                    Request
                </Link>
                {status === "authenticated" ? (
                    <Link href={`/profile/user/${data.user.username}`}>
                        <UserProfile />
                    </Link>
                ) : (
                    <Link href="/auth/signin" className="text-[14px] text-white min-[550px]:text-[16px]">
                        Signin
                    </Link>
                )}
            </ul>
        </nav>
    );
};
export default Navbar;
