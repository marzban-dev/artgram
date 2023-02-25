export interface IInputProps extends React.ComponentProps<"input"> {
    fullWidth?: boolean;
    error?: boolean;
    errorMessage?: string;
    showLabel?: boolean;
    containerClassName?: string;
    icon?: any;
    inputSize?: "sm" | "md";
}
