import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import AvatarEditor from "react-avatar-editor";
import BasicInfo from "./BasicInfo";
import LoadingBackdrop from "../../../UI/LoadingBackdrop";
import { updateUserInfo, uploadUserAvatar } from "../../../api/user";
import Alert from "../../../UI/ActionAlerts";
import AvatarUploader from "./AvatarUploader";
import { b64toBlob } from "../../../utils/helper";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    tabs: {
        "& button": {
            outline: 0,
        },
    },
}));

const Settings = (props) => {
    const {
        handleLoading,
        handleInfoChange,
        handleBDayChange,
        handleModuleClose,
        userInfo,
        isLoading,
    } = props;
    const theme = useTheme();
    const classes = useStyles();

    const [avatar, setAvatar] = useState("");
    const [tabValue, setTabValue] = useState(0);
    const [err, setErr] = useState("");

    const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

    const handleTabsChange = (event, newTab) => {
        setTabValue(newTab);
    };

    const handleUpdateUserInfo = async () => {
        switch (tabValue) {
            case 0:
                handleLoading(true);
                try {
                    const response = await updateUserInfo(userInfo);
                    handleLoading(false);
                } catch (error) {
                    if (error.response) {
                        setErr(error.response.data.error);
                    }
                    handleLoading(false);
                }
                break;
            case 1:
                handleAvatarUpload();
                break;
            default:
                return;
        }
    };

    const handleAvatarUpload = async () => {
        if (!avatar) return;
        handleLoading(true);
        const blob = b64toBlob(avatar);
        const fd = new FormData();
        fd.append("avatar", blob);

        try {
            const response = await uploadUserAvatar(fd);
            handleLoading(false);
            console.log(response);
        } catch (error) {
            handleLoading(false);
            if (error.response) {
                console.log(error.response);
                setErr(error.response.data.error);
            }
        }
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={true}
            onClose={handleModuleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={tabValue}
                        className={classes.tabs}
                        onChange={handleTabsChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label="Basic info" {...a11yProps(0)} />
                        <Tab label="Avatar" {...a11yProps(1)} />
                        <Tab label="Advance settings" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>

                {isLoading ? (
                    <LoadingBackdrop />
                ) : (
                    <>
                        <TabPanel value={tabValue} index={0}>
                            <BasicInfo
                                userInfo={userInfo}
                                handleInfoChange={handleInfoChange}
                                handleBDayChange={handleBDayChange}
                            />
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            {err && <Alert msg={err} />}
                            <AvatarUploader
                                originalAvatar={userInfo.avatar}
                                setAvatar={setAvatar}
                            />
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            Item Three
                        </TabPanel>
                    </>
                )}
            </div>

            <Button size="small" onClick={handleUpdateUserInfo}>
                Save
            </Button>
        </Dialog>
    );
};

export default withRouter(Settings);
