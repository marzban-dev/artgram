import { ISelectOptionProps } from "./select-option.types";

const SelectOption: React.FC<ISelectOptionProps> = ({ text, value }) => {
    return <option value={value} className="bg-red-400 appearance-none focus:rounded-none">{text}</option>;
};
export default SelectOption;
