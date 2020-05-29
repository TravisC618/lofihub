import React from "react";
import { Link, withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { WATCH_URL } from "../../../routes/URLMAP";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { EDIT_VIDEO_URL } from "../../../routes/URLMAP";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
    },
    details: {
        display: "flex",
        flexDirection: "column",
    },
    content: {
        flex: "1 0 auto",
        "& a": {
            textDecoration: "none",
            color: "#000",
        },
    },
    cover: {
        width: 151,
    },
    controls: {
        display: "flex",
        alignItems: "center",
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        "& button": {
            outline: 0,
        },
    },
    editIcon: {
        height: 38,
        width: 38,
    },

    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        maxWidth: "none",
        "& a": {
            textDecoration: "none",
        },
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    cardMedia: {
        paddingTop: "56.25%", // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));

const VideoBlock = (props) => {
    const classes = useStyles();

    const {
        username,
        videosArr,
        location: { pathname: currentPath },
    } = props;

    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                {videosArr.map((video) => (
                    <Grid item key={video} sm={12} md={6}>
                        <Card className={classes.root}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Link to={`${WATCH_URL}/${video._id}`}>
                                        <Typography component="h5" variant="h5">
                                            {video.title
                                                ? video.title
                                                : "Title required"}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="textSecondary"
                                        >
                                            {username}
                                        </Typography>
                                    </Link>
                                </CardContent>
                                <div className={classes.controls}>
                                    <Link to={`${WATCH_URL}/${video._id}`}>
                                        <IconButton aria-label="play">
                                            <PlayCircleFilledWhiteIcon />
                                        </IconButton>
                                    </Link>
                                    <Link
                                        to={`${currentPath + EDIT_VIDEO_URL}/${
                                            video._id
                                        }`}
                                    >
                                        <IconButton aria-label="edit">
                                            <EditIcon
                                                className={classes.editIcon}
                                            />
                                        </IconButton>
                                    </Link>
                                    <IconButton aria-label="more-info">
                                        <MoreVertIcon />
                                    </IconButton>
                                </div>
                            </div>
                            <CardMedia
                                className={classes.cover}
                                image={
                                    video.thumbnail
                                        ? video.thumbnail
                                        : "https://source.unsplash.com/random"
                                }
                                title={video.title}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default withRouter(VideoBlock);
