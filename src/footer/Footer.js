import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: theme.spacing(6),
    },
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Lofihub
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const Footer = (props) => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Typography
                variant="subtitle1"
                align="center"
                color="textSecondary"
                component="p"
            ></Typography>
            <Copyright />
        </footer>
    );
};

export default Footer;
