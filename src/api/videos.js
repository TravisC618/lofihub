import querystring from "querystring";
import { get, post, put } from "./axios";
import { getUserId } from "../utils/auth";

const API_VIDEO_URL = "/videos";
const API_COMMENT_URL = "/comments";

export const getVideoInfo = async (videoId) => {
    const url = API_VIDEO_URL + "/" + videoId;
    return await get(url);
};

export const getAllVideos = async ({
    page = 1,
    pageSize = 10,
    sort = "",
    q = "",
}) => {
    const stringField = querystring.stringify({ page, pageSize, sort, q });
    console.log(stringField);
    const url = API_VIDEO_URL + "?" + stringField;

    return await get(url);
};

export const uploadVideo = async (data) => {
    const url = API_VIDEO_URL + "/" + getUserId();
    return await put(url, data);
};

export const updateVideo = async (videoId, data) => {
    const url = API_VIDEO_URL + "/edit/" + videoId;
    return await put(url, data);
};

export const uploadThumbnail = async (videoId, data) => {
    const url = API_VIDEO_URL + "/" + videoId + "/thumbnail";
    return await put(url, data);
};

export const addComment = async (videoId, data) => {
    const url =
        API_VIDEO_URL + "/" + videoId + API_COMMENT_URL + "/" + getUserId();
    return await post(url, data);
};
