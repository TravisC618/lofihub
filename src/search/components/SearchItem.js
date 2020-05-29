import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 445,
        margin: "0 auto",
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function SearchItem({ video }) {
    const classes = useStyles();
    const {
        thumbnail,
        title,
        postDate,
        url,
        description,
        views,
        poster: { username, avatar },
    } = video;
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={
                    thumbnail ? thumbnail : "https://source.unsplash.com/random"
                }
                title="Paella dish"
            />
            <CardHeader
                avatar={
                    <Avatar
                        src={avatar}
                        aria-label="recipe"
                        className={classes.avatar}
                    >
                        R
                    </Avatar>
                }
                title={title}
                subheader={`${username} • ${views} views`}
                subheaderTypographyProps={{ variant: "caption" }}
            />
            <CardContent>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    noWrap
                >
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}
