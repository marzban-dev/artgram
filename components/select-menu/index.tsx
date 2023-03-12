import { useMemo } from "react";
import SelectOption from "./components/select-option";
import { ISelectMenuProps } from "./select-menu.types";
import DropDownIcon from "public/assets/icon/caret-down-solid.svg";
import classNames from "classnames";

const SelectMenu: React.FC<ISelectMenuProps> = ({
    items,
    containerClassName,
    fullWidth,
    icon: Icon,
    inputSize = "md",
    ...rest
}) => {
    const renderOptions = useMemo(() => {
        return items.map((item) => <SelectOption {...item} key={item.value} />);
    }, [items]);

    const containerClasses = classNames(
        {
            "relative flex rounded-[12px] border-2 border-[rgb(40,40,40)] bg-[rgb(30,30,30)] text-white outline-none transition-colors focus-within:border-[rgb(60,60,60)] hover:border-[rgb(50,50,50)]": 1,
            "w-full": fullWidth,
            "w-[350px]": !fullWidth,
            "h-[40px]": inputSize === "sm",
            "h-[50px]": inputSize === "md",
        },
        containerClassName
    );

    const iconClasses = classNames({
        "fill-[rgb(150,150,150)]": 1,
        "h-[20px]": inputSize === "sm",
        "h-[22px]": inputSize === "md",
    });

    return (
        <div className={containerClasses}>
            {Icon && (
                <div className="absolute left-[12px] flex h-full items-center justify-center">
                    <Icon className={iconClasses} />
                </div>
            )}
            <select {...rest} className="z-[20] ml-6 h-full w-full appearance-none bg-transparent px-3 scrollbar-custom outline-none">
                {renderOptions}
            </select>
            <div className="absolute right-[12px] flex h-full items-center justify-center">
                <DropDownIcon className="h-[20px] fill-[rgb(150,150,150)]" />
            </div>
        </div>
    );
};
export default SelectMenu;
