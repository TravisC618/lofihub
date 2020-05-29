import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import {
    likeVideo,
    removeLike,
    dislikeVideo,
    removeDislike,
} from "../../api/user";
import { getUserId } from "../../utils/auth";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    iconGroup: {
        width: "auto",
        "& button": {
            outline: "0",
            background: "transparent",
            boxShadow: "none",
        },
    },
    iconButton: {
        color: "blue",
    },
    info: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    infoItem: {
        marginRight: theme.spacing(1),
        marginBottom: "0",
    },
    categoryItem: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(2),
        borderRadius: theme.spacing(2),
    },
}));

const Info = ({ videoInfo }) => {
    const classes = useStyles();

    const [isLike, setIsLike] = useState(false);
    const [likeNum, setLikeNum] = useState("");
    const [isDislike, setIsDisLike] = useState(false);
    const [dislikeNum, setDislikeNum] = useState("");
    const [fav, setFav] = useState(false);
    const [err, setErr] = useState("");
    console.log(videoInfo);

    useEffect(() => {
        if (videoInfo.like.includes(getUserId())) {
            setIsLike(true);
        }

        if (videoInfo.dislike.includes(getUserId())) {
            setIsDisLike(true);
        }

        setLikeNum(videoInfo.like.length);
        setDislikeNum(videoInfo.dislike.length);
    }, [videoInfo.like, videoInfo.dislike]);

    const handleLike = async () => {
        setIsLike(!isLike);

        // if already like => remove like
        if (isLike) {
            setLikeNum(likeNum - 1);
            try {
                const response = await removeLike(videoInfo._id);
                console.log(response);
            } catch (error) {
                setErr(error.response.data.error);
                console.log(error.response);
            }
            return;
        }

        // if already dislike => remove dislike and add like
        // remove dislike request done by server
        if (isDislike) {
            setIsDisLike(false);
            setDislikeNum(dislikeNum - 1);
        }

        // add like
        setLikeNum(likeNum + 1);
        try {
            const response = await likeVideo(videoInfo._id);
            console.log(response);
        } catch (error) {
            if (error.response) {
                setErr(error.response.data.error);
                console.log(error.response);
            }
        }
    };

    const handleDislike = async () => {
        setIsDisLike(!isDislike);

        // if already dislike => remove dislike
        if (isDislike) {
            setDislikeNum(dislikeNum - 1);
            try {
                const response = await removeDislike(videoInfo._id);
                console.log(response);
            } catch (error) {
                setErr(error.response.data.error);
                console.log(error.response);
            }
            return;
        }

        // if already like => remove like and add dislike
        // remove like request done by server
        if (isLike) {
            setIsLike(false);
            setLikeNum(likeNum - 1);
        }

        // add dislike
        setDislikeNum(dislikeNum + 1);
        try {
            const response = await dislikeVideo(videoInfo._id);
            console.log(response);
        } catch (error) {
            setErr(error.response.data.error);
            console.log(error.response);
        }
    };

    return (
        <Grid className={classes.root} container direction="column">
            <Typography variant="h2">{videoInfo.title}</Typography>
            <Grid container alignItems="center" justify="space-between">
                <Typography variant="caption" display="block" gutterBottom>
                    {videoInfo.views} views •{" "}
                    <Moment format="D MMM YYYY">{videoInfo.postDate}</Moment>
                </Typography>
                <Grid
                    container
                    alignItems="center"
                    className={classes.iconGroup}
                >
                    <IconButton
                        onClick={handleLike}
                        color={isLike ? "primary" : "default"}
                    >
                        <ThumbUpAltIcon />
                    </IconButton>
                    {likeNum}
                    <IconButton
                        onClick={handleDislike}
                        color={isDislike ? "primary" : "default"}
                    >
                        <ThumbDownIcon />
                    </IconButton>
                    {dislikeNum}
                    <IconButton
                        onClick={() => {
                            setFav(!fav);
                        }}
                        security
                        color={fav ? "secondary" : "default"}
                    >
                        <FavoriteIcon />
                    </IconButton>
                    <Button variant="contained" endIcon={<ShareIcon />}>
                        Share
                    </Button>
                </Grid>
            </Grid>
            <Divider />
            <Grid className={classes.info} container>
                <Avatar
                    className={classes.infoItem}
                    alt="Remy Sharp"
                    src={videoInfo.poster.avatar + "?" + Math.random()}
                />
                <Typography
                    className={classes.infoItem}
                    variant="h6"
                    gutterBottom
                >
                    {videoInfo.poster.username}
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                >
                    Follow
                </Button>
            </Grid>
            <Typography className={classes.info} variant="body1" gutterBottom>
                {videoInfo.description}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                {videoInfo.category.length} Categories
            </Typography>
            <Grid container>
                {videoInfo.category.map((cate) => (
                    <Button
                        className={classes.categoryItem}
                        variant="contained"
                        size="small"
                        color="primary"
                    >
                        {cate}
                    </Button>
                ))}
            </Grid>
            <Divider />
        </Grid>
    );
};

export default Info;
