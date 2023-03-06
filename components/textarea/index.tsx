import classNames from "classnames";
import { ITextareaProps } from "./textarea.types";

const Textarea: React.FC<ITextareaProps> = ({ error, errorMessage, fullWidth, showLabel, resize, ...rest }) => {
    const containerClasses = classNames({
        "h-[150px] rounded-[12px] bg-[rgb(30,30,30)] border-2 transition-colors text-white px-3 flex justify-between align-center gap-3 relative": 1,
        "border-red-600 hover:border-red-400 focus-within:border-red-400": error,
        "border-[rgb(40,40,40)] hover:border-[rgb(50,50,50)] focus-within:border-[rgb(60,60,60)]": !error,
        "w-full": fullWidth,
        "w-[350px]": !fullWidth,
    });

    const textareaClasses = classNames({
        "w-full bg-transparent outline-none border-none placeholder:text-[rgb(100,100,100)] scrollbar-custom pt-[10px]": 1,
        "resize-y": resize,
        "resize-none": !resize,
    });

    return (
        <div className={containerClasses}>
            <textarea className={textareaClasses} {...rest} />
        </div>
    );
};

export default Textarea;
