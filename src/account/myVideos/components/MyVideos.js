import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import VideoBlock from "./VideosBlock";

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

const MyVideos = () => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.dataBlock}>
                <ur className={classes.dataUr}>
                    <li className={classes.dataList}>
                        <strong>11 Videos</strong>
                    </li>
                    <li className={classes.dataList}>387 Likes</li>
                    <li className={classes.dataList}>2988 Favorites</li>
                </ur>
            </div>
            <div className={classes.videoBlock}>
                <VideoBlock />
            </div>
        </>
    );
};

export default MyVideos;
