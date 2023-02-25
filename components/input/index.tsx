import classNames from "classnames";
import { IInputProps } from "./input.types";

const Input: React.FC<IInputProps> = ({
    error,
    errorMessage,
    fullWidth,
    showLabel,
    icon: Icon,
    inputSize = "md",
    ...rest
}) => {
    const containerClasses = classNames({
        "rounded-[12px] bg-[rgb(30,30,30)] border-2 transition-colors text-white px-3 flex justify-between align-center gap-3 relative": 1,
        "border-red-600 hover:border-red-400 focus-within:border-red-400": error,
        "border-[rgb(40,40,40)] hover:border-[rgb(50,50,50)] focus-within:border-[rgb(60,60,60)]": !error,
        "w-full": fullWidth,
        "w-[350px]": !fullWidth,
        "h-[40px]": inputSize === "sm",
        "h-[50px]": inputSize === "md",
    });

    const iconClasses = classNames({
        "fill-[rgb(150,150,150)]": 1,
        "h-[20px]": inputSize === "sm",
        "h-[22px]": inputSize === "md",
    });

    return (
        <div className={containerClasses}>
            <input
                {...rest}
                className="w-full bg-transparent outline-none border-none placeholder:text-[rgb(100,100,100)]"
            />
            {Icon && (
                <div className="h-full flex justify-center items-center">
                    <Icon className={iconClasses} />
                </div>
            )}
        </div>
    );
};

export default Input;
