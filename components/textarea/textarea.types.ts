export interface ITextareaProps extends React.ComponentProps<"textarea"> {
    fullWidth?: boolean;
    error?: boolean;
    errorMessage?: string;
    showLabel?: boolean;
    containerClassName?: string;
    resize?:boolean;
}
