export interface ISigninRequestParams {
    username: string;
    password: string;
}

export interface ISigninResponse {
    access: string;
    refresh: string;
}

export interface ISignupRequestParams {
    username: string;
    email: string;
    password: string;
}

export interface ISignupResponse {
    id: number;
    username: string;
    email: string;
}

export interface IGetUserResponse {
    id: number;
    username: string;
    email: string;
}
