import axios from "config/axios";

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

export const signin = async (params: ISigninRequestParams) => {
    const response = await axios.post<ISigninResponse>("/auth/jwt/create/", {
        username: params.username,
        password: params.password,
    });

    return response.data;
};

export const signup = async (params: ISignupRequestParams) => {
    const response = await axios.post<ISignupResponse>("/auth/users/", {
        username: params.username,
        email: params.email,
        password: params.password,
    });

    return response.data;
};

export const getUser = async (token: string) => {
    const response = await axios.get<IGetUserResponse>("/auth/users/me/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
