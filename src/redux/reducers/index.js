import { combineReducers } from "redux";
import loginReducers from "../reducers/loginReducers";
import searchReducers from "../reducers/searchReducers";

const reducers = combineReducers({
    login: loginReducers,
    search: searchReducers,
});

export default reducers;
