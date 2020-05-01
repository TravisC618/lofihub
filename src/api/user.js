import { get, post, put } from "./axios";
import { getUserId } from "../utils/auth";

const API_AUTH_URL = "/auth";
const API_USER_URL = "/users";

export const login = async (data) => {
    return await post(API_AUTH_URL, data);
};

export const register = async (data) => {
    return await post(API_USER_URL, data);
};

export const getUserInfo = async () => {
    const url = API_USER_URL + "/" + getUserId();
    return await get(url);
};

export const updateUserInfo = async (data) => {
    const url = API_USER_URL + "/" + getUserId();
    return await post(url, data);
};

export const uploadUserAvatar = async (data) => {
    const url = API_USER_URL + "/" + getUserId() + "/avatar";
    return await put(url, data);
};
