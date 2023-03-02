import Logo from "components/logo";
import Navbar from "components/navbar";
import { Form, Formik } from "formik";
import { motion, Variants } from "framer-motion";
import useImageColors from "hooks/use-image-colors";
import Link from "next/link";
import React, { useEffect } from "react";
import FormButton from "../form-button";
import BackgroundPicture from "./components/background-picture";
import { IFormContainerProps } from "./form-container.types";

const FormContainer: React.FC<IFormContainerProps> = ({ initial, schema, onSubmit, title, children, formState }) => {
    const imageColors = useImageColors("#form-background-image");

    const formType = title.includes("Create") ? "singup" : "signin";

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
        <main className="bg-black w-full h-screen flex justify-start items-center relative gap-[80px]">
            <Formik initialValues={initial} validationSchema={schema} onSubmit={onSubmit}>
                {({ status, isSubmitting }) => (
                    <motion.div
                        variants={mainVariants}
                        className="flex justify-center items-center w-full min-[950px]:w-[50%] h-screen z-20 bg-[rgba(0,0,0,0.4)] min-[950px]:bg-[rgba(0,0,0,0.8)] backdrop-blur-md relative"
                    >
                        <Form
                            className="w-[320px] min-[950px]:w-[350px] flex justify-center items-center flex-col"
                            autoComplete="off"
                        >
                            <div className="absolute top-[25px] px-[25px] z-20 flex justify-between items-center gap-8 w-full">
                                <Logo />
                                <Navbar />
                            </div>
                            <div className="flex justify-center items-start flex-col gap-4 w-full">
                                <div className="mb-[35px]">
                                    <h1 className="text-white text-[35px] min-[500px]:text-[40px] font-semibold whitespace-nowrap pb-1">
                                        {title}
                                        <span className="text-form-background-primary">.</span>
                                    </h1>
                                    <span className="ml-1 min-[500px]:text-[18px] text-[rgb(150,150,150)]">
                                        {formType === "singup" ? "Have an account? " : "New to artgram? "}
                                        <Link
                                            href={formType === "singup" ? "/auth/signin" : "/auth/signup"}
                                            className="text-blue-500"
                                        >
                                            {formType === "singup" ? "Sign in now" : "Sign up now"}
                                        </Link>
                                    </span>
                                </div>
                                {children}
                                {formType !== "singup" && (
                                    <Link href="/auth/signin" className="ml-1 text-blue-500">
                                        Forgot password?
                                    </Link>
                                )}
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
            <BackgroundPicture />
        </main>
    );
};
export default FormContainer;
