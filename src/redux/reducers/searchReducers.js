import {
    UPDATE_FETCHING_STATUS,
    UPDATE_SEARCH_VALUE,
    UPDATE_PAGE,
} from "../actions/searchAction";

const initialState = {
    searchVal: "",
    page: 1,
    pageSize: 10,
    sort: "",
    isFetching: false,
};

const searchReducers = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SEARCH_VALUE:
            return {
                ...state,
                searchVal: action.searchVal,
            };
        case UPDATE_FETCHING_STATUS:
            return {
                ...state,
                isFetching: action.isFetching,
            };
        case UPDATE_PAGE:
            return {
                ...state,
                page: action.page,
            };
        default:
            return state;
    }
};

export default searchReducers;
