import { TFormState } from "../form-container/form-container.types";

export interface IFormButtonProps {
    disabled: boolean;
    children: string;
    formState: TFormState;
}
