import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";
import { addComment } from "../../api/videos";
import CircularIndeterminate from "../../UI/CircularIndeterminate";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: "36ch",
    },
    inline: {
        display: "inline",
    },
    inputWrapper: {
        marginBottom: theme.spacing(2),
    },
    commentNum: {
        marginTop: theme.spacing(2),
    },
    commentAvatar: {
        alignSelf: "center",
    },
    commentInput: {
        width: "90%",
    },
    commentButton: {
        color: "#fff",
        width: "100px",
        alignSelf: "flex-end",
        marginTop: theme.spacing(1),
    },
    listItem: {
        padding: 0,
    },
    buttonGroup: {
        paddingLeft: theme.spacing(8),
        marginBottom: theme.spacing(2),
        "& button": {
            outline: 0,
        },
    },
    iconButton: {
        padding: 0,
        marginRight: theme.spacing(1),
    },
    button: {
        width: "18px",
        padding: 0,
    },
}));

export default function Comments({ videoId, comments, setIsUpdating }) {
    const classes = useStyles();

    const [comment, setComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");

    const handleAddComment = async () => {
        setIsLoading(true);
        setIsUpdating(true);

        setErr("");
        try {
            const response = await addComment(videoId, { comment });
            console.log(response);
            setIsLoading(false);
            setIsUpdating(false);
        } catch (error) {
            if (error.response) {
                setErr(error.response.data.error);
            }
            setIsLoading(false);
            setIsUpdating(false);
        }
    };

    const handleOnChange = (event) => {
        setComment(event.target.value);
    };

    return (
        <>
            <div className={classes.inputWrapper}>
                <Typography
                    className={classes.commentNum}
                    variant="subtitle1"
                    gutterBottom
                >
                    {comments.length} Comments
                </Typography>

                {isLoading ? (
                    <CircularIndeterminate />
                ) : (
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item className={classes.commentAvatar}>
                            <Avatar alt="avatar" src="" />
                        </Grid>
                        <Grid
                            className={classes.commentInput}
                            container
                            direction="column"
                        >
                            <TextField
                                fullWidth
                                name="comment"
                                value={comment}
                                label="Add a comment"
                                error={err}
                                helperText={err && err}
                                onChange={handleOnChange}
                            />
                            <Button
                                className={classes.commentButton}
                                variant="contained"
                                onClick={handleAddComment}
                            >
                                COMMENT
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </div>
            <List className={classes.root}>
                {comments.map((comment) => (
                    <>
                        <ListItem
                            className={classes.listItem}
                            justify="flex-end"
                        >
                            <ListItemAvatar>
                                <Avatar
                                    alt="avatar"
                                    src={
                                        comment.poster.avatar +
                                        "?" +
                                        Math.random()
                                    }
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={comment.poster.username}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {comment.comment}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Grid
                            className={classes.buttonGroup}
                            container
                            alignItems="center"
                        >
                            <IconButton className={classes.iconButton}>
                                <ThumbUpAltIcon className={classes.button} />
                            </IconButton>
                            <IconButton className={classes.iconButton}>
                                <ThumbDownIcon className={classes.button} />
                            </IconButton>
                            <Button className={classes.button} size="small">
                                REPLY
                            </Button>
                        </Grid>
                    </>
                ))}
            </List>
        </>
    );
}
