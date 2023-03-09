import { useMemo } from "react";
import SelectOption from "./components/select-option";
import { ISelectMenuProps } from "./select-menu.types";
import DropDownIcon from "public/assets/icon/caret-down.svg";

const SelectMenu: React.FC<ISelectMenuProps> = ({ items }) => {
    const renderOptions = useMemo(() => {
        return items.map((item) => <SelectOption {...item} key={item.value} />);
    }, [items]);

    return (
        <div className="relative flex h-[40px] rounded-[12px] border-2 border-[rgb(40,40,40)] bg-[rgb(30,30,30)] text-white outline-none transition-colors focus-within:border-[rgb(60,60,60)] hover:border-[rgb(50,50,50)]">
            <select className="h-full w-full appearance-none bg-transparent px-3 outline-none z-[20]">{renderOptions}</select>
            <div className="absolute right-0 flex h-full items-center justify-center">
                <DropDownIcon className="h-[20px] fill-white" />
            </div>
        </div>
    );
};
export default SelectMenu;
