import * as Yup from "yup";
import { ISigninFormValues } from "pages/auth/signin/signin.types";
import { ISignupFormValues } from "pages/auth/signup/signup.types";
import { FormikHelpers } from "formik";

export type TFormState = "loading" | "success" | "error" | "idle";

export interface IFormContainerProps {
    initial: ISigninFormValues | ISignupFormValues;
    schema: Yup.AnyObjectSchema;
    onSubmit: (
        values: ISigninFormValues | ISignupFormValues,
        formikHelpers: FormikHelpers<ISigninFormValues | ISignupFormValues>
    ) => void;
    title: string;
    children: any;
    formState: TFormState;
}
