import { FormikHelpers } from "formik";

export interface ISigninProps {}

export interface ISigninFormValues {
    username: string;
    password: string;
}

export type TSigninOnSubmit = (
    values: ISigninFormValues,
    formikHelpers: FormikHelpers<ISigninFormValues>
) => void;
