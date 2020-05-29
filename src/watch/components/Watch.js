import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Player from "./Player";
import Info from "./Info";
import PlayList from "./PlayList";
import Comments from "./Comments";
import { getVideoInfo } from "../../api/videos";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
    },
}));

const Watch = ({
    match: {
        params: { videoId },
    },
}) => {
    const classes = useStyles();

    const [videoInfo, setVideoInfo] = useState({
        title: "",
        url: "",
        description: "",
        category: [],
        thumbnail: "",
        views: "",
        like: "",
        dislike: "",
        comments: [],
        poster: {},
        postDate: "",
        bullets: [],
    });

    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        async function fetchVideoInfo() {
            const response = await getVideoInfo(videoId);
            const {
                _id,
                title,
                url,
                description,
                category,
                thumbnail,
                views,
                like,
                dislike,
                comments,
                poster,
                postDate,
                bullets,
            } = response.data.data;
            setVideoInfo({
                _id,
                title,
                url,
                description,
                category,
                thumbnail,
                views,
                like,
                dislike,
                comments,
                poster,
                postDate,
                bullets,
            });
        }
        fetchVideoInfo();
    }, [isUpdating]);

    return (
        <>
            <Player
                url={videoInfo.url}
                thumbnail={videoInfo.thumbnail}
                existedBullets={videoInfo.bullets}
            />
            <Grid className={classes.container} container>
                <Grid item sm={12} md={7} lg={8}>
                    <Info videoInfo={videoInfo} />
                    <Comments
                        videoId={videoInfo._id}
                        comments={videoInfo.comments}
                        setIsUpdating={setIsUpdating}
                    />
                </Grid>
                <Grid item sm={12} md={5} lg={4}>
                    <PlayList />
                </Grid>
            </Grid>
        </>
    );
};

export default Watch;
