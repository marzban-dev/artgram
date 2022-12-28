import { Form, Formik } from "formik";
import React, { useState } from "react";
import FormButton from "../form-button";
import BackgroundPicture from "./components/background-picture";
import { IFormContainerProps, TFormState } from "./form-container.types";

const FormContainer: React.FC<IFormContainerProps> = ({
    initial,
    schema,
    onSubmit,
    title,
    children,
    formState,
}) => {
    return (
        <main className="bg-[#272936] w-full h-screen flex justify-start items-center relative px-[10%]">
            <BackgroundPicture />
            <Formik initialValues={initial} validationSchema={schema} onSubmit={onSubmit}>
                {({ errors, isSubmitting }) => (
                    <Form className="w-[350px] z-20" autoComplete="off">
                        <div className=" flex justify-center items-start gap-4 flex-col ">
                            <h1 className="text-[#f6fafb] text-[50px] font-semibold whitespace-nowrap mb-[35px]">
                                Signin to account
                                <span className="text-form-background-primary">.</span>
                            </h1>
                            {children}
                            <FormButton formState={formState} disabled={false}>
                                Signin
                            </FormButton>
                        </div>
                    </Form>
                )}
            </Formik>
        </main>
    );
};
export default FormContainer;
