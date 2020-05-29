import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import {
    Typography,
    TextField,
    Grid,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@material-ui/core";
import {
    getVideoInfo,
    updateVideo,
    uploadThumbnail,
} from "../../../api/videos";
import LoadingSpinner from "../../../UI/LoadingSpinner";
import LoadingBackdrop from "../../../UI/LoadingBackdrop";
import ActionAlerts from "../../../UI/ActionAlerts";
import CategorySelector from "../../settings/components/CategorySelector";

const useStyles = makeStyles((theme) => ({
    root: {
        "& button": {
            outline: "none",
        },
    },
    textField: {
        paddingBottom: theme.spacing(2),
    },
    subtitle: {
        fontSize: "15px",
    },
    caption: {
        fontSize: "13px",
    },
    radioGroup: {
        "& span": {
            fontSize: "13px",
            padding: 0,
            marginLeft: theme.spacing(1),
        },
        "& label": {
            marginBottom: 0,
        },
        "& svg": {
            width: "0.5em",
        },
    },
    thumbnailContainer: {
        width: "100px",
        flexWrap: "unset",
        marginBottom: theme.spacing(2),
        "& img": {
            width: "100%",
            marginTop: theme.spacing(2),
            marginRight: theme.spacing(2),
        },
    },
    margin: {
        marginTop: theme.spacing(2),
    },
}));

const EditModule = (props) => {
    const {
        handleModuleClose,
        match: {
            params: { videoId },
        },
    } = props;
    const theme = useTheme();
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: [],
        ageRestriction: false,
    });

    const [uploadFilename, setUploadFilename] = useState("");
    const [uploadedImg, setUploadedImg] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [err, setErr] = useState("");

    useEffect(() => {
        async function fetchVideo() {
            setIsLoading(true);
            try {
                const response = await getVideoInfo(videoId);
                const {
                    title,
                    description,
                    ageRestriction,
                    category,
                } = response.data.data;
                setForm({ title, description, ageRestriction, category });
                setIsLoading(false);
            } catch (error) {
                if (error.response) {
                    setErr(error.response.data.error);
                }
                setIsLoading(false);
            }
        }
        fetchVideo();
    }, []);

    const handleOnChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setForm({ ...form, [key]: value });
    };

    const handleCategoryChange = (value) => {
        setForm({ ...form, category: value });
    };

    const handleUploadThumbnail = async (event) => {
        console.log(event.target.files[0]);
        // setThumbnail(event.target.files[0]);
        setErr("");
        // setIsLoading(true);
        setIsUploading(true);

        const thumbnail = event.target.files[0];
        thumbnail && setUploadFilename(thumbnail.name);

        const fd = new FormData();
        fd.append("thumbnail", thumbnail);
        try {
            const response = await uploadThumbnail(videoId, fd);
            setUploadedImg(response.data.data.thumbnail);
            console.log("uploadThumbnail: ", response);
            // setIsLoading(false);
            setIsUploading(false);
        } catch (error) {
            if (error.response) {
                setErr(error.response.data.error);
                console.log(error.response);
            }
            // setIsLoading(false);
            setIsUploading(false);
        }
    };

    const handleUpdateVideo = async () => {
        setErr("");
        setIsLoading(true);
        try {
            const resposne = await updateVideo(videoId, form);
            console.log("updateVideo: ", resposne);
            setIsLoading(false);
        } catch (error) {
            if (error.response) {
                setErr(error.response.data.error);
                console.log(error.response);
            }
            setIsLoading(false);
        }
    };

    if (isLoading) return <LoadingBackdrop />;

    return (
        <Dialog
            fullScreen={fullScreen}
            open={true}
            onClose={handleModuleClose}
            aria-labelledby="responsive-dialog-title"
            className={classes.root}
        >
            {isUploading && <LoadingSpinner />}
            <DialogTitle id="responsive-dialog-title">Details</DialogTitle>
            {err && <ActionAlerts msg={err} />}
            <DialogContent>
                <Grid container direction="column">
                    <TextField
                        required
                        className={classes.textField}
                        id="outlined-required"
                        label="Title"
                        variant="outlined"
                        defaultValue={form.title}
                        name="title"
                        onChange={handleOnChange}
                    />

                    <TextField
                        id="outlined-multiline-static"
                        className={classes.textField}
                        label="Description"
                        multiline
                        rows={4}
                        placeholder="Tell viewers about your video"
                        defaultValue={form.description}
                        variant="outlined"
                        name="description"
                        onChange={handleOnChange}
                    />
                </Grid>

                <Typography className={classes.subtitle} variant="subtitle1">
                    Thumbnail
                </Typography>
                <DialogContentText className={classes.caption}>
                    Select or upload a picture that shows what's in your video.
                    A good thumbnail stands out and draws viewers' attention.
                </DialogContentText>

                <div class="custom-file">
                    <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        onChange={handleUploadThumbnail}
                    />
                    <label className="custom-file-label" for="customFile">
                        {uploadFilename ? uploadFilename : "Choose file"}
                    </label>
                </div>
                {uploadedImg && (
                    <Grid container className={classes.thumbnailContainer}>
                        <img
                            src={uploadedImg + "?" + Math.random()}
                            alt="thumbnail"
                        />
                    </Grid>
                )}

                <Grid className={classes.margin} container direction="column">
                    <Typography
                        className={classes.subtitle}
                        variant="subtitle1"
                        gutterBottom
                    >
                        Age restriction
                    </Typography>
                    <Typography
                        variant="body1"
                        className={classes.caption}
                        gutterBottom
                    >
                        Do you want to restrict your video to an adult audience?
                    </Typography>
                    <DialogContentText className={classes.caption}>
                        These videos are not shown in certain areas of YouTube.
                        By default, age-restricted videos won't include ads and
                        can't be monetized.
                    </DialogContentText>
                    <RadioGroup
                        className={classes.radioGroup}
                        name="ageRestriction"
                        value={form.ageRestriction.toString()}
                        onChange={handleOnChange}
                    >
                        <FormControlLabel
                            value="true"
                            control={<Radio color="primary" />}
                            label="Yes, restrict my video to viewers over 18"
                        />
                        <FormControlLabel
                            value="false"
                            control={<Radio color="primary" />}
                            label="No, don't restrict my video to viewers over 18 only"
                        />
                    </RadioGroup>
                </Grid>
                <Grid className={classes.margin} container direction="column">
                    <CategorySelector
                        cateInform={form.category}
                        handleCategoryChange={handleCategoryChange}
                    />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleUpdateVideo} color="primary" autoFocus>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default withRouter(EditModule);
