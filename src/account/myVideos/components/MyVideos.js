import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import VideoBlock from "./VideosBlock";
import { getUserInfo } from "../../../api/user";

const useStyles = makeStyles((theme) => ({
    dataBlock: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        // marginBottom: theme.spacing(4),
    },
    dataUr: {
        display: "flex",
        listStyle: "none",
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    dataList: {
        marginRight: theme.spacing(2),
    },
    videoBlock: {
        padding: theme.spacing(2),
    },
}));

const MyVideos = (props) => {
    const classes = useStyles();
    const { username, videosArr } = props;

    return (
        <>
            <div className={classes.dataBlock}>
                <ur className={classes.dataUr}>
                    <li className={classes.dataList}>
                        <strong>{videosArr.length} Videos</strong>
                    </li>
                    <li className={classes.dataList}>387 Views</li>
                    <li className={classes.dataList}>2988 Likes</li>
                </ur>
            </div>
            <div className={classes.videoBlock}>
                <VideoBlock username={username} videosArr={videosArr} />
            </div>
        </>
    );
};

export default MyVideos;
