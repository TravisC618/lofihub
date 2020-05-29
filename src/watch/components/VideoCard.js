import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
        maxWidth: 245,
    },
    media: {
        height: 140,
    },
    title: {
        fontSize: "14px",
    },
    info: {
        fontSize: "13px",
    },
});

export default function VideoCard(props) {
    const classes = useStyles();
    const { title } = props;

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://source.unsplash.com/random"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography
                        className={classes.title}
                        gutterBottom
                        variant="h5"
                        component="h2"
                    >
                        *{title}
                    </Typography>
                    <Typography
                        className={classes.info}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        * Username
                    </Typography>
                    <Typography
                        className={classes.info}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        * xxx Views • post date
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
