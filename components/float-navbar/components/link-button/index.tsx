import classNames from "classnames";
import Avatar from "components/avatar";
import Link from "next/link";
import { useRouter } from "next/router";
import { INavButtonProps } from "./link-button.types";

const NavButton: React.FC<INavButtonProps> = ({ icon: Icon, avatar, route, attention }) => {
    const router = useRouter();

    const isRouteMatch = router.pathname === route;

    const iconClasses = classNames({
        "h-[26px] group-hover:fill-white transition-colors": 1,
        "fill-white": isRouteMatch,
        "fill-[rgb(180,180,180)]": !isRouteMatch,
    });

    return (
        <li>
            <Link href={route} className="flex justify-start items-center group cursor-pointer gap-2 relative">
                {isRouteMatch && (
                    <div className="max-[750px]:hidden absolute left-[-12px] w-[6px] h-[6px] rounded-[6px] bg-white" />
                )}
                <div className="relative flex justify-center items-center">
                    {attention && (
                        <div className="absolute right-[-14px] w-[6px] h-[6px] rounded-full bg-red-500 z-10" />
                    )}
                    {Icon && <Icon className={iconClasses} />}
                    {avatar && <Avatar picture={avatar} title="some title" width={28} height={28} />}
                </div>
            </Link>
        </li>
    );
};

export default NavButton;
