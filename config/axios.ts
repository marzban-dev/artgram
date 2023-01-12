import axiosModule from "axios";

const axios = axiosModule.create({
    baseURL: "https://artgram.iran.liara.run",
});

export default axios;