import { ISelectOptionProps } from "./select-option.types";

const SelectOption: React.FC<ISelectOptionProps> = ({ text, value }) => {
    return (
        <option value={value} className="appearance-none bg-[rgb(40,40,40)] text-white focus:rounded-none">
            {text}
        </option>
    );
};
export default SelectOption;
