import { IPagePaddingProps } from "./page-padding.types";

const PagePadding: React.FC<IPagePaddingProps> = ({ children }) => {
    return (
        <div className="w-full h-auto px-[12%]">
            {children}
        </div>
    );
};

export default PagePadding;