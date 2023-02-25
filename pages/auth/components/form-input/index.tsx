import Input from "components/input";
import { ErrorMessage, useField } from "formik";
import React, { useRef } from "react";
import { TFormInputProps } from "./form-input.types";

const FormInput: React.FC<TFormInputProps> = ({ rightElement: RightElement, ...props }) => {
    const [field, meta] = useField(props);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const focusOnInput = () => inputRef.current?.focus();

    return (
        <div className="w-full flex flex-col justify-start items-start cursor-text" onClick={focusOnInput}>
            {/* @ts-ignore */}
            <Input
                {...field}
                {...props}
                error={!!meta.error && meta.touched}
                ref={inputRef}
                icon={RightElement}
                autoComplete="off"
                fullWidth
            />
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
