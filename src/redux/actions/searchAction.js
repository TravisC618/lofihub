export const UPDATE_SEARCH_VALUE = "UPDATE_SEARCH_VALUE";
export const UPDATE_FETCHING_STATUS = "UPDATE_FETCHING_STATUS";
export const UPDATE_PAGE = "UPDATE_PAGE";

export const updateSearchValue = (searchVal) => ({
    type: UPDATE_SEARCH_VALUE,
    searchVal,
});

export const updateFetchingStatus = (isFetching) => ({
    type: UPDATE_FETCHING_STATUS,
    isFetching,
});

export const updatePage = (page) => ({
    type: UPDATE_PAGE,
    page,
});
