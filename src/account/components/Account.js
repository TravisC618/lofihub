import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import ListItems from "./ListItems";
import Dashboard from "../dashboard/Dashboard";
import Settings from "../settings/components/Settings";
import MyVideos from "../myVideos/components/MyVideos";
import Favourite from "../favourite/Favourite";
import History from "../history/History";
import ProfileHead from "./ProfileHead";
import LoadingBackdrop from "../../UI/LoadingBackdrop";
import { getUserInfo } from "../../api/user";
import {
    ACCOUNT_URL,
    ACCOUNT_DASHBOARD_URL,
    ACCOUNT_SETTING_URL,
    ACCOUNT_VIDEOS_URL,
    ACCOUNT_FAVORITE_URL,
    ACCOUNT_HISTORY_URL,
    UPLOAD_URL,
    EDIT_VIDEO_URL,
} from "../../routes/URLMAP";
import UploadVideo from "../uploadVideo.js/UploadVideo";
import EditModule from "../myVideos/components/EditModule";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
        "& button": {
            outline: 0,
        },
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    appBar: {
        backgroundColor: "#f4f7f6",
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
        color: "rgba(0, 0, 0, 0.54)",
    },
    menuButtonHidden: {
        display: "none",
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: 240,
    },
    notificationIcon: {
        color: "rgba(0, 0, 0, 0.54)",
    },
}));

export default function Account(props) {
    const classes = useStyles();
    const { history, match, location } = props;

    console.log(location.pathname + ACCOUNT_SETTING_URL);

    const [userInfo, setUserInfo] = useState({
        usename: "",
        gender: "",
        birthday: "",
        introduction: "",
        avatar: "",
        videos: [],
    });

    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");

    const [openDraw, setOpenDraw] = useState(true);
    const handleDrawerOpen = () => {
        setOpenDraw(true);
    };
    const handleDrawerClose = () => {
        setOpenDraw(false);
    };

    const handleModuleClose = () => {
        history.goBack();
    };

    const handleInfoChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setUserInfo({ ...userInfo, [key]: value });
    };

    const handleBDayChange = (date) => {
        setUserInfo({ ...userInfo, birthday: new Date(date) });
    };

    const handleLoading = (status) => {
        setIsLoading(status);
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
                    avatar,
                    videos,
                } = response.data.data;
                setUserInfo({
                    username,
                    gender,
                    birthday,
                    introduction,
                    avatar,
                    videos,
                });
                setIsLoading(false);
            } catch (error) {
                if (error.response) {
                    setErr(error.response.data.error);
                }
                setIsLoading(false);
            }
        }

        fetchUserInfo();
    }, []);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="absolute"
                className={clsx(
                    classes.appBar,
                    openDraw && classes.appBarShift
                )}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(
                            classes.menuButton,
                            openDraw && classes.menuButtonHidden
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link
                        to="/"
                        style={{ textDecoration: "none", color: "#000" }}
                    >
                        <IconButton className={classes.notificationIcon}>
                            <Badge color="secondary">
                                <HomeIcon />
                            </Badge>
                        </IconButton>
                    </Link>
                    <Link
                        to={location.pathname + UPLOAD_URL}
                        style={{ textDecoration: "none", color: "#000" }}
                    >
                        <IconButton className={classes.notificationIcon}>
                            <Badge color="secondary">
                                <VideoCallIcon />
                            </Badge>
                        </IconButton>
                    </Link>
                    <IconButton className={classes.notificationIcon}>
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(
                        classes.drawerPaper,
                        !openDraw && classes.drawerPaperClose
                    ),
                }}
                open={openDraw}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItems />
                </List>
            </Drawer>
            {isLoading ? (
                <LoadingBackdrop />
            ) : (
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <ProfileHead
                        username={userInfo.username}
                        introduction={userInfo.introduction}
                        avatar={userInfo.avatar}
                    />
                    <Divider />
                    <Route
                        path={ACCOUNT_URL + "/:userId" + ACCOUNT_DASHBOARD_URL}
                        component={Dashboard}
                    />
                    <Route
                        path={ACCOUNT_URL + "/:userId" + ACCOUNT_VIDEOS_URL}
                        render={() => (
                            <MyVideos
                                username={userInfo.username}
                                videosArr={userInfo.videos}
                            />
                        )}
                    />
                    <Route
                        path={ACCOUNT_URL + "/:userId" + ACCOUNT_FAVORITE_URL}
                        component={Favourite}
                    />
                    <Route
                        path={ACCOUNT_URL + "/:userId" + ACCOUNT_HISTORY_URL}
                        component={History}
                    />
                    <Route
                        path={match.path + "/:section" + ACCOUNT_SETTING_URL}
                        render={() => (
                            <Settings
                                isLoading={isLoading}
                                userInfo={userInfo}
                                handleLoading={handleLoading}
                                handleInfoChange={handleInfoChange}
                                handleBDayChange={handleBDayChange}
                                handleModuleClose={handleModuleClose}
                            />
                        )}
                    />
                    <Route
                        path={match.path + "/:section" + UPLOAD_URL}
                        render={() => (
                            <UploadVideo
                                isLoading={isLoading}
                                handleLoading={handleLoading}
                                handleModuleClose={handleModuleClose}
                            />
                        )}
                    />
                    <Route
                        path={
                            match.path +
                            "/:section" +
                            EDIT_VIDEO_URL +
                            "/:videoId"
                        }
                        render={() => (
                            <EditModule handleModuleClose={handleModuleClose} />
                        )}
                    />
                </main>
            )}
        </div>
    );
}
