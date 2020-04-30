import jwt from "jsonwebtoken";

const JWT_TOKEN_NAME = "jwtToken-Lofihub";
const USER_ID_NAME = "userId-Lofihub";

export const setToken = (token) => {
    localStorage.setItem(JWT_TOKEN_NAME, token);
};

export const removeToken = () => {
    localStorage.removeItem(JWT_TOKEN_NAME);
};

export const getToken = () => {
    return localStorage.getItem(JWT_TOKEN_NAME);
};

export const isLoggedIn = () => {
    const token = localStorage.getItem(JWT_TOKEN_NAME);

    if (!token) {
        return false;
    }
    const decoded = jwt.decode(token);
    if (!decoded) {
        return false;
    }
    const expiredTime = decoded.exp;
    const isExpired = Date.now() - expiredTime * 1000 > 0;
    return !isExpired;
};

export const getUserId = () => {
    return localStorage.getItem(USER_ID_NAME);
};

export const setUserId = (userId) => {
    localStorage.setItem(USER_ID_NAME, userId);
};

export const removeUserId = (userId) => {
    localStorage.removeItem(USER_ID_NAME);
};
