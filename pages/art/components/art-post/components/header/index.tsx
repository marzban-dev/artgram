import Avatar from "components/avatar";
import Link from "next/link";
import { IHeaderProps } from "./header.types";

const Header: React.FC<IHeaderProps> = ({ title, artist, year }) => {
    const route = `/profile/artist/${artist.id}`;

    return (
        <div className="flex justify-start items-center gap-3 min-[800px]:gap-4 w-[calc(100%_-_100px)]">
            <Link href={route}>
                <Avatar
                    className="w-[45px] min-[800px]:w-[60px] h-[45px] min-[800px]:h-[60px]"
                    picture={artist.image}
                    title={title}
                />
            </Link>
            <div className="flex justify-start items-start flex-col max-w-[calc(100%_-_100px)]">
                <h2 className="text-white text-[16px] min-[800px]:text-[20px] overflow-hidden whitespace-nowrap text-ellipsis w-full">
                    {title}
                </h2>
                <div className="text-[rgb(150,150,150)] text-[12px] min-[800px]:text-[15px] overflow-hidden whitespace-nowrap text-ellipsis w-full">
                    <Link href={route}>{artist.name}</Link> - <span>{year}</span>
                </div>
            </div>
        </div>
    );
};

export default Header;
