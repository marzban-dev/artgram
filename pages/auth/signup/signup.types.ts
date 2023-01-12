import { FormikHelpers } from "formik";
import { TOnFormSubmit } from "../components/form-container/form-container.types";

export interface ISignupFormValues {
    username: string;
    email: string;
    password: string;
}

export type TSignupOnSubmit = TOnFormSubmit<ISignupFormValues>;
