import { signup } from "api/auth.api";
import { AxiosError } from "axios";
import PageTransition from "layouts/page-transition";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import EmailIcon from "public/assets/icon/envelope.svg";
import LockIcon from "public/assets/icon/lock.svg";
import UserIcon from "public/assets/icon/user.svg";
import { useState } from "react";
import * as Yup from "yup";
import FormContainer from "../components/form-container";
import { TFormState } from "../components/form-container/form-container.types";
import FormInput from "../components/form-input";
import { ISignupFormValues, TSignupOnSubmit } from "./signup.types";

const SignupPage: NextPage = () => {
    const [formState, setFormState] = useState<TFormState>("idle");

    const schema = Yup.object().shape({
        username: Yup.string()
            .min(2, "Username is too short")
            .max(20, "Username must lower than 20 char")
            .required("Username is required"),
        email: Yup.string().email("Email is not valid").required("Email is required"),
        password: Yup.string().min(8, "Password must bigger than 7 char").required("Password is required"),
    });

    const onSubmit: TSignupOnSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
            setFormState("loading");
            setStatus(null);

            const result = await signup({
                username: values.username,
                password: values.password,
                email: values.email,
            });

            setFormState("success");
        } catch (e) {
            const error = e as AxiosError;

            setFormState("error");

            if (error.status === 401) {
                setStatus("Your credential is incorrect.");
                setTimeout(() => setStatus(null), 2500);
            }

            setTimeout(() => setFormState("idle"), 2500);
        }

        setSubmitting(false);
    };

    const initialValue: ISignupFormValues = { username: "", password: "", email: "" };

    return (
        <PageTransition>
            <Head>
                <title>Sign up</title>
                <meta name="description" content="Create new artgram account" />
            </Head>
            <FormContainer
                schema={schema}
                onSubmit={onSubmit}
                initial={initialValue}
                title="Create account"
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
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="text"
                    autoComplete="false"
                    rightElement={EmailIcon}
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
        </PageTransition>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {},
    };
};

export default SignupPage;
