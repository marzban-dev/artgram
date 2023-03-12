import { ISelectOptionProps } from "./components/select-option/select-option.types";

export interface ISelectMenuProps extends React.ComponentProps<"select"> {
    items: ISelectOptionProps[];
    fullWidth?: boolean;
    containerClassName?: string;
    icon?: any;
    inputSize?: "sm" | "md";
}
