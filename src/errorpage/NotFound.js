import React from "react";
import illustration404 from "./assets/404.svg";
import { Grid, Typography } from "@material-ui/core";

const NotFound = () => {
    return (
        <Grid
            container
            direction="column"
            alignContent="center"
            justify="center"
        >
            <img
                src={illustration404}
                alt="404-not-found"
                style={{ width: "30%", margin: "2rem 0" }}
            />
            <Typography align="center">
                No result has found.
                <br />
                Try searching for something else.
            </Typography>
        </Grid>
    );
};

export default NotFound;
