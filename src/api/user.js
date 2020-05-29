import { get, post, put } from "./axios";
import { getUserId } from "../utils/auth";

const API_AUTH_URL = "/auth";
const API_USER_URL = "/users";
const API_CONFIRMATION_URL = "/confirmation";
const API_FINDPASSWORD_URL = "/findpass";
const API_RESETPASSWORD_URL = "/resetpass";
const API_LIKE_URL = "/like";
const API_DISLIKE_URL = "/dislike";
const API_REMOVELIKE_URL = "/removelike";
const API_REMOVEDISLIKE_URL = "/removedislike";

export const login = async (data) => {
    return await post(API_AUTH_URL, data);
};

export const register = async (data) => {
    return await post(API_USER_URL, data);
};

export const emailConfirmation = async (token) => {
    const url =
        API_USER_URL + "/" + getUserId() + API_CONFIRMATION_URL + "/" + token;
    return await get(url);
};

export const findPassword = async (data) => {
    const url = API_USER_URL + "/" + getUserId() + API_FINDPASSWORD_URL;
    return await post(url, data);
};

export const resetPassword = async (token, password) => {
    const url = API_USER_URL + API_RESETPASSWORD_URL + "/" + token;
    return await put(url, { password });
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

export const likeVideo = async (videoId) => {
    const url = API_USER_URL + "/" + getUserId() + API_LIKE_URL + "/" + videoId;
    return await post(url);
};

export const removeLike = async (videoId) => {
    const url =
        API_USER_URL + "/" + getUserId() + API_REMOVELIKE_URL + "/" + videoId;
    return await post(url);
};

export const dislikeVideo = async (videoId) => {
    const url =
        API_USER_URL + "/" + getUserId() + API_DISLIKE_URL + "/" + videoId;
    return await post(url);
};

export const removeDislike = async (videoId) => {
    const url =
        API_USER_URL +
        "/" +
        getUserId() +
        API_REMOVEDISLIKE_URL +
        "/" +
        videoId;
    return await post(url);
};
