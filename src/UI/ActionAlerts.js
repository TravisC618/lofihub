import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export default function ActionAlerts(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Alert variant="outlined" severity="error">
                {props.msg}
            </Alert>
        </div>
    );
}
