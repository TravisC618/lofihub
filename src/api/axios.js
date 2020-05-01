import axios from "axios";
import { getToken } from "../utils/auth";

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = "http://lofihub-server.herokuapp.com/api";

const appendAuthToken = (config) => {
    const jwtToken = getToken();
    const Authorization = jwtToken && "Bearer " + jwtToken;

    return { ...config, headers: { Authorization, ...config.headers } };
};

export const get = async (url, config = {}) => {
    return await axios.get(url, appendAuthToken(config));
};

export const post = async (url, data, config = {}) => {
    return await axios.post(url, data, appendAuthToken(config));
};

export const put = async (url, data, config = {}) => {
    return await axios.put(url, data, appendAuthToken(config));
};
