import { Form, Formik } from "formik";
import useImageColors from "hooks/use-image-colors";
import React, { useEffect } from "react";
import FormButton from "../form-button";
import BackgroundPicture from "./components/background-picture";
import { IFormContainerProps } from "./form-container.types";
import { motion, Variants } from "framer-motion";

const FormContainer: React.FC<IFormContainerProps> = ({
    initial,
    schema,
    onSubmit,
    title,
    children,
    formState,
}) => {
    const imageColors = useImageColors("#form-background-image");

    useEffect(() => {
        if (imageColors) {
            const root = document.querySelector(":root") as HTMLElement;
            root.style.setProperty("--form-background-primary-color", imageColors.primary);
            root.style.setProperty("--form-background-lighter-color", imageColors.lighter);
        }
    }, [imageColors]);

    const mainVariants: Variants = {
        hide: {
            scale: 0,
        },
        show: {
            scale: 1,
        },
        exit: {
            scale: 0,
        },
    };

    return (
        <main className="bg-[#272936] w-full h-screen flex justify-start items-center relative px-[10%]">
            <BackgroundPicture />
            <Formik initialValues={initial} validationSchema={schema} onSubmit={onSubmit}>
                {({ status, isSubmitting }) => (
                    <motion.div variants={mainVariants} className="w-[350px] z-20">
                        <Form className="w-full" autoComplete="off">
                            <div className=" flex justify-center items-start gap-4 flex-col ">
                                <h1 className="text-[#f6fafb] text-[50px] font-semibold whitespace-nowrap mb-[35px]">
                                    Signin to account
                                    <span className="text-form-background-primary">.</span>
                                </h1>
                                {children}
                                {status && (
                                    <div className="text-red-400 text-[16px] font-medium flex justify-start items-center gap-2 px-3 sm:px-4 mt-2">
                                        {status}
                                    </div>
                                )}
                                <FormButton formState={formState} disabled={isSubmitting}>
                                    Signin
                                </FormButton>
                            </div>
                        </Form>
                    </motion.div>
                )}
            </Formik>
        </main>
    );
};
export default FormContainer;
