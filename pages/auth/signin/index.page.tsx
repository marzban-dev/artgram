import PageTransition from "layouts/page-transition";
import { GetServerSideProps, NextPage } from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import LockIcon from "public/assets/icon/lock.svg";
import UserIcon from "public/assets/icon/user.svg";
import { useState } from "react";
import * as Yup from "yup";
import FormContainer from "../components/form-container";
import { TFormState } from "../components/form-container/form-container.types";
import FormInput from "../components/form-input";
import { ISigninFormValues, TSigninOnSubmit } from "./signin.types";

const SigninPage: NextPage = () => {
    const { push } = useRouter();
    const [formState, setFormState] = useState<TFormState>("idle");

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
            setTimeout(async () => await push("/explore"), 2500);
        }

        setSubmitting(false);
    };

    const initialValue: ISigninFormValues = { username: "", password: "" };

    return (
        <PageTransition>
            <FormContainer
                schema={schema}
                onSubmit={onSubmit}
                initial={initialValue}
                title="Signin to account"
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
        </PageTransition>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            // csrfToken: await getCsrfToken(context),
        },
    };
};

export default SigninPage;
