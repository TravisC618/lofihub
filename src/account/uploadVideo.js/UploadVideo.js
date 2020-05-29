import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Uploader from "./Uploader";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ActionAlerts from "../../UI/ActionAlerts";

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
        padding: theme.spacing(1),
    },
    padding: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
}));

const UploadVideo = (props) => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");

    const { handleModuleClose } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

    const handleLoading = (loadingState) => {
        setIsLoading(loadingState);
    };
    const handleError = (errMsg) => {
        setErr(errMsg);
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={true}
            onClose={handleModuleClose}
            aria-labelledby="responsive-dialog-title"
        >
            {isLoading && <LoadingSpinner />}
            <DialogTitle id="responsive-dialog-title">
                {"Upload videos"}
            </DialogTitle>
            {err && (
                <div className={classes.padding}>
                    <ActionAlerts msg={err} />
                </div>
            )}
            <DialogContent>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Uploader
                        handleLoading={handleLoading}
                        handleError={handleError}
                    />
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default UploadVideo;
