import classNames from "classnames";
import { useRouter } from "next/router";
import { IPagePaddingProps } from "./page-padding.types";

const PagePadding: React.FC<IPagePaddingProps> = ({ children }) => {
    const { pathname } = useRouter();

    const containerClasses = classNames({
        "w-full h-full": 1,
        "px-[6%] min-[550px]:px-[8%] min-[750px]:px-[12%]": pathname.includes("/explore"),
        "min-[750px]:px-[6%] min-[1300px]:px-[12%] 1": pathname.includes("/profile"),
    });

    return <div className={containerClasses}>{children}</div>;
};

export default PagePadding;
