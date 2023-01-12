import * as Yup from "yup";
import { ISigninFormValues } from "pages/auth/signin/signin.types";
import { ISignupFormValues } from "pages/auth/signup/signup.types";
import { FormikHelpers } from "formik";

export type TFormState = "loading" | "success" | "error" | "idle";

export type TOnFormSubmit<T> = (values: T, formikHelpers: FormikHelpers<T>) => void;

export interface IFormContainerProps {
    initial: ISigninFormValues | ISignupFormValues;
    schema: Yup.AnyObjectSchema;
    onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void;
    title: string;
    children: any;
    formState: TFormState;
}
