import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Avatar from "@material-ui/core/Avatar";
import AvatarEditor from "react-avatar-editor";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "400px",
    },
    uploadWrapper: {
        position: "relative",
        marginTop: theme.spacing(10),
    },
    avatar: {
        margin: "0 auto",
        width: "130px",
        height: "130px",
    },
    uploadLabel: {
        margin: 0,
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        transition: ".5s",
        opacity: 0,
        "&:hover": {
            opacity: 1,
        },
    },
    cropperWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(200,200,200,.8)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "99",
    },
    wrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: theme.spacing(2),
    },
    label: {
        margin: " 0 10px 0 0",
    },
    typography: {
        fontSize: "25px",
        marginTop: theme.spacing(3),
    },
    cancelButton: {
        marginRight: theme.spacing(3),
    },
}));

export default function AvatarUploader({ setAvatar, originalAvatar }) {
    const classes = useStyles();
    const [editor, setEditor] = useState(null);
    const [isCropperOpen, setIsCropperOpen] = useState(false);
    const [img, setImg] = useState(null);
    const [zoom, setZoom] = useState(2);
    const [rotate, setRotate] = useState(0);
    const [croppedImg, setCroppedImg] = useState(
        originalAvatar + "?" + Math.random()
    );

    const handleZoomSlider = (event, value) => {
        setZoom(value);
    };

    const rotateLeft = () => {
        setRotate(rotate - 90);
    };

    const rotateRight = () => {
        setRotate(rotate + 90);
    };

    const handleCancel = () => {
        setIsCropperOpen(false);
    };

    const handleFileChange = (event) => {
        const url = window.URL.createObjectURL(event.target.files[0]);
        setImg(url);
        setIsCropperOpen(true);
    };

    const handleSave = async (event) => {
        if (editor) {
            const canvasScaled = editor.getImageScaledToCanvas();
            const croppedImg = canvasScaled.toDataURL();
            setAvatar(croppedImg);

            setImg(null);
            setIsCropperOpen(false);
            setCroppedImg(croppedImg);
            setRotate(0);
        }
    };

    const setEditorRef = (editor) => {
        setEditor(editor);
    };

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignContent="center"
            className={classes.root}
        >
            <div className={classes.uploadWrapper}>
                <Avatar
                    src={croppedImg}
                    size={100}
                    className={classes.avatar}
                />
                <label htmlFor="avatar-input" className={classes.uploadLabel}>
                    <IconButton
                        aria-label="upload picture"
                        component="span"
                        className={classes.avatar}
                    >
                        <PhotoCamera
                            color="primary"
                            style={{ height: 50, width: 50 }}
                        />
                    </IconButton>
                </label>
            </div>
            <Typography
                className={classes.typography}
                variant="caption"
                display="block"
                gutterBottom
            >
                Click To Set An Avatar
            </Typography>
            <input
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
            {isCropperOpen && (
                <div className={classes.cropperWrapper}>
                    <AvatarEditor
                        ref={setEditorRef}
                        image={img}
                        width={200}
                        height={200}
                        border={50}
                        color={[255, 255, 255, 0.6]} // RGBA
                        rotate={rotate}
                        scale={zoom}
                    />
                    <div className={classes.wrapper}>
                        <label className={classes.label}>Zoom</label>
                        <Slider
                            min={1}
                            max={10}
                            step={0.1}
                            value={zoom}
                            onChange={handleZoomSlider}
                            style={{ width: 200 }}
                        />
                    </div>
                    <div className={classes.wrapper}>
                        <label className={classes.label}>Rotate</label>
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={rotateLeft}
                        >
                            <RotateLeftIcon />
                        </IconButton>
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={rotateRight}
                        >
                            <RotateRightIcon />
                        </IconButton>
                    </div>
                    <div>
                        <Button
                            label="CANCEL"
                            labelPosition="before"
                            containerElement="label"
                            onClick={handleCancel}
                            variant="outlined"
                            className={classes.cancelButton}
                        >
                            Cancel
                        </Button>
                        <Button
                            label="SAVE"
                            labelPosition="before"
                            containerElement="label"
                            onClick={handleSave}
                            color="secondary"
                            variant="outlined"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            )}
        </Grid>
    );
}
