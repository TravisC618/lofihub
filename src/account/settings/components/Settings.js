import React, { useState, useEffect } from "react";
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
import BasicInfo from "./BasicInfo";
import { getUserInfo } from "../../../api/user";
import LoadingBackdrop from "../../../UI/LoadingBackdrop";
import { setUserId } from "../../../utils/auth";
import { updateUserInfo, uploadUserAvatar } from "../../../api/user";

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
    const { handleSettingsClose } = props;
    const theme = useTheme();
    const classes = useStyles();

    const [userInfo, setUserInfo] = useState({
        username: "",
        gender: "",
        birthday: "",
        introduction: "",
    });
    const [avatar, setAvatar] = useState("");
    const [tabValue, setTabValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");

    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const handleTabsChange = (event, newTab) => {
        setTabValue(newTab);
    };

    const handleInfoChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setUserInfo({ ...userInfo, [key]: value });
    };

    const handleBDayChange = (date) => {
        setUserInfo({ ...userInfo, birthday: new Date(date) });
    };

    const handleUpdateUserInfo = async () => {
        setIsLoading(true);
        try {
            const response = await updateUserInfo(userInfo);
            console.log(response);
            setIsLoading(false);
        } catch (error) {
            if (error.response) {
                setErr(error.response.data.error);
            }
            setIsLoading(false);
        }
    };

    const handleFileSelect = (event) => {
        console.log(event.target.files[0]);
        setAvatar(event.target.files[0]);
    };

    const handleAvatarUpload = async () => {
        setIsLoading(true);

        try {
            const fd = new FormData();
            fd.append("avatar", avatar);
            const response = await uploadUserAvatar(fd);
            console.log("response: ", response);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            if (error.response) {
                console.log(error.response);
                setErr(error.response.data.error);
            }
            setIsLoading(false);
        }
    };

    useEffect(() => {
        async function fetchUserInfo() {
            setIsLoading(true);
            try {
                const response = await getUserInfo();
                const {
                    username,
                    gender,
                    birthday,
                    introduction,
                } = response.data.data;
                setUserInfo({ username, gender, birthday, introduction });
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        }
        fetchUserInfo();
    }, []);

    return (
        <Dialog
            fullScreen={fullScreen}
            open={true}
            onClose={handleSettingsClose}
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
                            <input type="file" onChange={handleFileSelect} />
                            <button onClick={handleAvatarUpload}>upload</button>
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
