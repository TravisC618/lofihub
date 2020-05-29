import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import VideoCard from "../components/VideoCard";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    videoCard: {
        paddingBottom: theme.spacing(1),
    },
}));

const PlayList = (props) => {
    const classes = useStyles();
    const [isAutoplay, setIsAutoPlay] = React.useState(true);
    const videoArr = [
        "Danny’s Girl",
        "Maned & Macho",
        "Getting Started With Material-UI For React -Material Design for React",
        "The Knot",
    ];

    const autoPlayHandler = (event) => {
        setIsAutoPlay(event.target.checked);
    };

    return (
        <Grid className={classes.root}>
            <Grid container alignItems="center" justify="space-between">
                <Typography variant="subtitle2">Up next</Typography>
                <Grid>
                    <Typography variant="overline">AUTOPLAY</Typography>
                    <Switch
                        checked={isAutoplay}
                        onChange={autoPlayHandler}
                        color="primary"
                        name="autoplay"
                        inputProps={{ "aria-label": "primary checkbox" }}
                    />
                </Grid>
            </Grid>
            {videoArr.map((v) => (
                <div className={classes.videoCard}>
                    <VideoCard title={v} />
                </div>
            ))}
        </Grid>
    );
};

export default PlayList;
