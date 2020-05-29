import React, { useEffect, useState, useRef } from "react";
import { Waypoint } from "react-waypoint";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import querystring from "querystring";
import { Grid, makeStyles } from "@material-ui/core";
import SearchItem from "./SearchItem";
import FilterDial from "./FilterDial";
import {
    UPDATE_SEARCH_VALUE,
    UPDATE_FETCHING_STATUS,
    UPDATE_PAGE,
} from "../../redux/actions/searchAction";
import { getAllVideos } from "../../api/videos";
import ActionAlerts from "../../UI/ActionAlerts";
import LoadingBackdrop from "../../UI/LoadingBackdrop";
import { WATCH_URL } from "../../routes/URLMAP";
import NotFound from "../../errorpage/NotFound";
import LoadingSkeleton from "../../UI/LoadingSkeleton";

const useStyles = makeStyles((theme) => ({
    root: {
        // marginTop: "64px",
    },
}));

const Search = ({ location: { search: searchQuery } }) => {
    const classes = useStyles();
    // const [videos, setVideos] = useState([]);
    const videos = useRef([]);
    const [hasMoreItem, setHasMoreItem] = useState(true);

    const { page, pageSize, sort, searchVal, isFetching } = useSelector(
        (state) => state.search
    );
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");

    useEffect(() => {
        const parse = querystring.parse(searchQuery.replace("?", ""));
        dispatch({ type: UPDATE_SEARCH_VALUE, searchVal: parse.q });

        async function fetchVideos() {
            setIsLoading(true);
            dispatch({ type: UPDATE_FETCHING_STATUS, isFetching: true });
            // videos.current = [];

            try {
                const response = await getAllVideos({
                    page,
                    pageSize,
                    sort,
                    q: parse.q,
                });
                const { videos: newVideos, pagination } = response.data.data;
                const totalPages = pagination.pages;

                console.log(newVideos);

                if (newVideos.length < pageSize || page >= totalPages) {
                    setHasMoreItem(false);
                }

                // setVideos(newVideos);
                for (let index = 0; index < newVideos.length; index++) {
                    videos.current = [...videos.current, newVideos[index]];
                }
                setIsLoading(false);
                dispatch({ type: UPDATE_FETCHING_STATUS, isFetching: false });
            } catch (error) {
                if (error.response) {
                    setErr(error.response.data.error);
                }
                setIsLoading(false);
                dispatch({ type: UPDATE_FETCHING_STATUS, isFetching: false });
            }
        }
        fetchVideos();
    }, [page, searchVal]);

    const fetchMore = () => {
        console.log("fetchMore...");
        dispatch({ type: UPDATE_PAGE, page: page + 1 });
    };

    const renderVideos = () => {
        // if (isFetching) return <LoadingBackdrop />;

        if (videos.current.length === 0 && !isFetching) return <NotFound />;

        return (
            <Grid
                className={classes.root}
                container
                alignContent="center"
                spacing={10}
            >
                {err && <ActionAlerts msg={err} />}
                {isFetching ? (
                    <>
                        <Grid item alignItems="center" xs={12} sm={6}>
                            <LoadingSkeleton />
                        </Grid>
                        <Grid item alignItems="center" xs={12} sm={6}>
                            <LoadingSkeleton />
                        </Grid>
                    </>
                ) : (
                    videos.current.map((video, index) => (
                        <React.Fragment>
                            <Grid item alignItems="center" xs={12} sm={6}>
                                <Link
                                    to={`${WATCH_URL}/${video._id}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    <SearchItem video={video} />
                                </Link>
                            </Grid>
                            {index === videos.current.length - 2 &&
                                hasMoreItem &&
                                !isFetching && <Waypoint onEnter={fetchMore} />}
                        </React.Fragment>
                    ))
                )}
            </Grid>
        );
    };

    return (
        <div>
            <FilterDial />
            {renderVideos()}
            {/* {videos.current.length !== 0 ? (
                <Grid
                    className={classes.root}
                    container
                    alignContent="center"
                    spacing={10}
                >
                    {err && <ActionAlerts msg={err} />}
                    {videos.current.map((video, index) => (
                        <React.Fragment>
                            <Grid item alignItems="center" xs={12} sm={6}>
                                <Link
                                    to={`${WATCH_URL}/${video._id}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    <SearchItem video={video} />
                                </Link>
                            </Grid>
                            {index === videos.current.length - 2 &&
                                hasMoreItem && <Waypoint onEnter={fetchMore} />}
                        </React.Fragment>
                    ))}
                </Grid>
            ) : (
                !isFetching && <NotFound />
            )} */}
        </div>
    );
};

export default Search;
