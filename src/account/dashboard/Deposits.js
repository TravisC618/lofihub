import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "../components/Title";

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Deposits() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Recent likes</Title>
            <Typography component="p" variant="h4">
                3,024
            </Typography>
            <Typography
                color="textSecondary"
                className={classes.depositContext}
            >
                on 15 March, 2019
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    More details
                </Link>
            </div>
        </React.Fragment>
    );
}
