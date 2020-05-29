import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import "../styles/profileHead.scss";

const useStyles = makeStyles((theme) => ({
    profileBlock: {
        padding: theme.spacing(2),
    },
    gridContainer: {
        margin: theme.spacing(2),
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        padding: theme.spacing(1),
    },
}));

const ProfileHead = (props) => {
    const classes = useStyles();
    const { username, introduction, avatar } = props;

    return (
        <div className={classes.profileBlock}>
            <Grid className={classes.gridContainer} container spacing={3}>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    xs={12}
                    sm={4}
                >
                    <a className="bt-circle" href="https://www.facebook.com/">
                        <Icon className="icon-svg fab fa-facebook-f" />
                    </a>
                    <a className="bt-circle" href="https://twitter.com/">
                        <Icon className="icon-svg fab fa-twitter" />
                    </a>
                    <a className="bt-circle" href="https://plus.google.com/">
                        <Icon className="icon-svg fab fa-google-plus-g" />
                    </a>
                </Grid>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    xs={12}
                    sm={4}
                >
                    <div className="avatar-block">
                        <Avatar
                            src={avatar + "?" + Math.random()}
                            className={classes.avatar}
                        />
                    </div>
                    <div className="username-block">{username}</div>
                    <div className="intro-block">{introduction}</div>
                </Grid>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    xs={12}
                    sm={4}
                >
                    awards
                </Grid>
            </Grid>
        </div>
    );
};

export default ProfileHead;
