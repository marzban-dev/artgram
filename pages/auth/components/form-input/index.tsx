import classNames from "classnames";
import { ErrorMessage, useField } from "formik";
import React, { useRef } from "react";
import { TFormInputProps } from "./form-input.types";

const FormInput: React.FC<TFormInputProps> = ({ rightElement: RightElement, ...props }) => {
    const [field, meta] = useField(props);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const focusOnInput = () => inputRef.current?.focus();

    const inputContainerClasses = classNames({
        "w-full group px-4 h-[50px] flex justify-between items-center border-[2px] transition-colors duration-300 rounded-[18px] border-2 border-[rgb(85,85,85)] hover:border-[rgb(180,180,180)] focus-within:border-[rgb(180,180,180)] ": 1,
        "border-red-500": !!meta.error && meta.touched,
    });

    const inputClasses = classNames({
        "bg-transparent outline-none w-full text-[18px] placeholder:text-[#7a7a7a] text-[#ffffff]": 1,
    });

    return (
        <div
            className="w-full flex flex-col justify-start items-start cursor-text"
            onClick={focusOnInput}
        >
            <div className={inputContainerClasses}>
                {/* @ts-ignore */}
                <input
                    {...field}
                    {...props}
                    ref={inputRef}
                    className={inputClasses}
                    autoComplete="off"
                />
                {RightElement && (
                    <RightElement className="fill-[rgb(180,180,180)] w-[20px]" />
                )}
            </div>
            <ErrorMessage component="div" name={props.name}>
                {(errMsg) => (
                    <div className="text-red-400 text-[16px] font-medium flex justify-start items-center gap-2 px-3 sm:px-4 mt-2">
                        <span>{errMsg}</span>
                    </div>
                )}
            </ErrorMessage>
        </div>
    );
};

export default FormInput;
