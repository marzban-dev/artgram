import { IHeaderProps } from "./header.types";

const Header: React.FC<IHeaderProps> = ({ title, artist, year }) => {
    return (
        <div className="flex justify-start items-start flex-col max-w-[calc(100%_-_100px)]">
            <h2 className="text-white text-[20px] font-semibold overflow-hidden whitespace-nowrap text-ellipsis w-full">
                {title}
            </h2>
            <div className="text-[rgba(200,200,200,1)] text-[15px] font-semibold overflow-hidden whitespace-nowrap text-ellipsis w-full">
                <span>{artist}</span> - <span>{year}</span>
            </div>
        </div>
    );
};

export default Header;
