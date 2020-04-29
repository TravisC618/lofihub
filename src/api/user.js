import { get, post } from "./axios";

const API_AUTH_URL = "/auth";
const API_USER_URL = "/users";

export const login = async (data) => {
    return await post(API_AUTH_URL, data);
};

export const register = async (data) => {
    return await post(API_USER_URL, data);
};
