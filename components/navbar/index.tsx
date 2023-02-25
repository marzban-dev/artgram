import UserProfile from "components/user-profile";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar: React.FC = () => {
    const { status, data } = useSession();

    return (
        <nav>
            <ul className="flex justify-start items-center gap-8">
                <Link href="/explore" className="text-white">
                    Explore
                </Link>
                <Link href="/request" className="text-white">
                    Request Artist
                </Link>
                {status === "authenticated" ? (
                    <Link href={`/profile/user/${data.user.username}`}>
                        <UserProfile />
                    </Link>
                ) : null}
            </ul>
        </nav>
    );
};
export default Navbar;
