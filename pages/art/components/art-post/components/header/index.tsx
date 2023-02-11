import Link from "next/link";
import { IHeaderProps } from "./header.types";

const Header: React.FC<IHeaderProps> = ({ id, title, artist, year }) => {
    return (
        <div className="flex justify-start items-start flex-col max-w-[calc(100%_-_100px)]">
            <h2 className="text-white text-[20px] overflow-hidden whitespace-nowrap text-ellipsis w-full">
                {title}
            </h2>
            <div className="text-[rgb(150,150,150)] text-[15px] overflow-hidden whitespace-nowrap text-ellipsis w-full">
                <Link href={`/profile/artist/${id}`}>{artist}</Link> - <span>{year}</span>
            </div>
        </div>
    );
};

export default Header;
