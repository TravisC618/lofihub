import { get, post, put } from "./axios";

const WECHAT_URL = '/wechat';
const API_WECHAT_AUTH = '/wechatAuthorize';

export const wechatAuthorize = async () => {
    const url = WECHAT_URL + API_WECHAT_AUTH;
    return await get(url);
}