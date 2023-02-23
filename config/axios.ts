import axiosModule from "axios";
import createAuthHeader from "utils/create-auth-header";

const axios = axiosModule.create({
    baseURL: "https://artgram.iran.liara.run",
});

axios.interceptors.request.use(async (config) => {
    if (!config.url!.includes("/auth/")) {
        const authHeader = await createAuthHeader();
        config.headers!.Authorization = authHeader.Authorization;
        return config;
    }

    return config;
});

export default axios;
