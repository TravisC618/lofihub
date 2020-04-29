import axios from "axios";

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = "http://localhost:4000/api";

export const get = async (url, config = {}) => {
    return await axios.get(url);
};

export const post = async (url, data, config = {}) => {
    return await axios.post(url, data);
};
