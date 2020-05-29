import { UPDATE_USER_INFO } from "../actions/loginActions";

const initialState = {
    username: "",
    gender: "",
    introduction: "",
    avatar: "",
    followers: [],
    following: [],
    videos: [],
};

const loginReducers = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_INFO:
            return {
                username: action.userInfo.username,
                gender: action.userInfo.gender,
                introduction: action.userInfo.introduction,
                avatar: action.userInfo.avatar,
                followers: action.userInfo.followers,
                following: action.userInfo.following,
                videos: action.userInfo.videos,
            };
        default:
            return state;
    }
};

export default loginReducers;
