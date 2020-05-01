import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
import Avatar from "@material-ui/core/Avatar";
import { useTheme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
        padding: theme.spacing(1),
    },
}));

const UploadVideo = (props) => {
    const classes = useStyles();
    const { isLoading, handleLoading, handleUploadDialogClose } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={true}
                onClose={handleUploadDialogClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Upload videos"}
                </DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src="https://image.flaticon.com/icons/svg/565/565133.svg"
                            className={classes.large}
                        />
                        <p>Drag and drop video files to upload</p>
                        <p>
                            Your videos will be private until you publish them.
                        </p>
                        <input type="file" />
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UploadVideo;
