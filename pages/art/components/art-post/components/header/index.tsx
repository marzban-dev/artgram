import Avatar from "components/avatar";
import TextOverflowAnimation from "components/text-overflow-animation";
import Link from "next/link";
import { IHeaderProps } from "./header.types";

const Header: React.FC<IHeaderProps> = ({ title, artist, year }) => {
    const route = `/profile/artist/${artist.id}`;

    return (
        <div className="flex w-[calc(100%_-_100px)] items-center justify-start gap-2 min-[800px]:gap-3">
            <Link href={route}>
                <Avatar
                    className="h-[45px] w-[45px] min-[800px]:h-[60px] min-[800px]:w-[60px]"
                    picture={artist.image}
                    title={title}
                />
            </Link>
            <div className="flex max-w-[calc(100%_-_100px)] flex-col items-start justify-start">
                <h2 className="w-full overflow-hidden text-ellipsis text-[16px] text-white min-[800px]:text-[20px]">
                    <TextOverflowAnimation className="px-2">{title}</TextOverflowAnimation>
                </h2>
                <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-[12px] text-[rgb(150,150,150)] min-[800px]:text-[15px]">
                    <TextOverflowAnimation className="px-2">
                        <Link href={route}>{artist.name}</Link>- <span>{year}</span>
                    </TextOverflowAnimation>
                </div>
            </div>
        </div>
    );
};

export default Header;
