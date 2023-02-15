import { IPagePaddingProps } from "./page-padding.types";

const PagePadding: React.FC<IPagePaddingProps> = ({ children }) => {
    return (
        <div className="w-full h-full px-[6%] min-[550px]:px-[8%] min-[750px]:px-[12%]">
            {children}
        </div>
    );
};

export default PagePadding;