import axios from "config/axios";
import {
    ISigninRequestParams,
    ISigninResponse,
    ISignupRequestParams,
    ISignupResponse,
    IGetUserResponse,
} from "./auth.types";

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

export const getUser = async () => {
    const response = await axios.get<IGetUserResponse>("/user/my/myinfo/");
    return response.data;
};