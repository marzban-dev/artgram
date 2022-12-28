import { GetServerSideProps, NextPage } from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import FormContainer from "../components/form-container";
import FormInput from "../components/form-input";
import { ISigninFormValues, TSigninOnSubmit } from "./signin.types";
import LockIcon from "public/assets/icon/lock.svg";
import UserIcon from "public/assets/icon/user.svg";
import useImageColors from "hooks/useImageColors";
import { TFormState } from "../components/form-container/form-container.types";

const SigninPage: NextPage = () => {
    const imageColors = useImageColors("#form-background-image");
    const [formState, setFormState] = useState<TFormState>("idle");

    useEffect(() => {
        if (imageColors) {
            const root = document.querySelector(":root") as HTMLElement;
            root.style.setProperty("--form-background-primary-color", imageColors.primary);
            root.style.setProperty("--form-background-lighter-color", imageColors.lighter);
        }
    }, [imageColors]);

    const schema = Yup.object().shape({
        username: Yup.string()
            .min(2, "Username is too short")
            .max(20, "Username must lower than 20 char")
            .required("Username is required"),
        password: Yup.string()
            .min(8, "Password must bigger than 7 char")
            .required("Password is required"),
    });

    const onSubmit: TSigninOnSubmit = async (values, { setSubmitting, setStatus }) => {
        setFormState("loading");
        setStatus(null);

        const result = await signIn("credentials", {
            redirect: false,
            username: values.username,
            password: values.password,
        });

        if (result?.error) {
            setFormState("error");
            if (result.status === 401) {
                setStatus("Your credential is incorrect.");
                setTimeout(() => setStatus(null), 2500);
            }
            setTimeout(() => setFormState("idle"), 2500);
        } else {
            setFormState("success");
        }

        setSubmitting(false);
    };

    const initialValue: ISigninFormValues = { username: "", password: "" };

    return (
        <FormContainer
            schema={schema}
            onSubmit={onSubmit}
            initial={initialValue}
            title="Signin"
            formState={formState}
        >
            <FormInput
                id="username"
                name="username"
                placeholder="Name"
                autoComplete="false"
                rightElement={UserIcon}
            />
            <FormInput
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                autoComplete="false"
                rightElement={LockIcon}
            />
        </FormContainer>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
};

export default SigninPage;
