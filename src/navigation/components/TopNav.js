import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import querystring from "querystring";
import { Link } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import NavDrawer from "./NavDrawer";
import { UPDATE_SEARCH_VALUE } from "../../redux/actions/searchAction";
import {
    removeToken,
    removeUserId,
    isLoggedIn,
    getUserId,
} from "../../utils/auth";
import {
    LOGIN_URL,
    ACCOUNT_URL,
    ACCOUNT_DASHBOARD_URL,
    SEARCH_URL,
} from "../../routes/URLMAP";
import { useEffect } from "react";
import LoadingSpinner from "../../UI/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    appbar: {
        backgroundColor: "#F9F9F8",
        color: "#202121",
        "& button": {
            outline: "none",
        },
        "& a": {
            textDecoration: "none",
            color: "rgba(0, 0, 0, 0.87)",
        },
    },
    menuItem: {
        "& a": {
            textDecoration: "none",
            color: "rgba(0, 0, 0, 0.87)",
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
}));

const TopNav = ({ history, location: { search: searchQuery } }) => {
    const classes = useStyles();
    const [isDrawerOpen, setIsDrawOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const [searchInput, setSearchInput] = useState("");
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const searchState = useSelector((state) => state.search);
    const dispatch = useDispatch();

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleLogout = () => {
        removeToken();
        removeUserId();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const updateSearchValue = (event) => {
        setSearchInput(event.target.value);
        // dispatch({ type: UPDATE_SEARCH_VALUE, searchVal: event.target.value });
    };

    const handleSearch = (event) => {
        if (event.key === "Enter") {
            dispatch({
                type: UPDATE_SEARCH_VALUE,
                searchVal: event.target.value,
            });
            const stringField = querystring.stringify({
                q: searchInput,
            });
            const parse = querystring.parse(stringField);
            history.push(`${SEARCH_URL}?${stringField}`);
        }
    };

    useEffect(() => {
        const parse = querystring.parse(searchQuery.replace("?", ""));
        setSearchInput(parse.q);
    }, [searchQuery]);

    const menuId = "primary-search-account-menu";
    const renderMenu = () => {
        if (isLoggedIn()) {
            return (
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    id={menuId}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                >
                    <MenuItem
                        className={classes.menuItem}
                        onClick={handleMenuClose}
                    >
                        <Link
                            to={
                                ACCOUNT_URL +
                                `/${getUserId()}` +
                                ACCOUNT_DASHBOARD_URL
                            }
                        >
                            My account
                        </Link>
                    </MenuItem>
                    <MenuItem
                        className={classes.menuItem}
                        onClick={() => {
                            handleMenuClose();
                            handleLogout();
                        }}
                    >
                        <Link to="/">Log out</Link>
                    </MenuItem>
                </Menu>
            );
        }
        return (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem
                    className={classes.menuItem}
                    onClick={handleMenuClose}
                >
                    <Link to={LOGIN_URL}>Register/Log in</Link>
                </MenuItem>
            </Menu>
        );
    };
    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    aria-label="show 11 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar className={classes.appbar} position="fixed">
                {searchState.isFetching && <LoadingSpinner />}
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setIsDrawOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <NavDrawer
                        isDrawerOpen={isDrawerOpen}
                        setIsDrawOpen={setIsDrawOpen}
                    />
                    <Link to="/">
                        <Typography
                            className={classes.title}
                            variant="h6"
                            noWrap
                        >
                            Lofihub
                        </Typography>
                    </Link>
                    {!searchState.isFetching && (
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                value={searchInput}
                                onChange={updateSearchValue}
                                inputProps={{ "aria-label": "search" }}
                                onKeyDown={handleSearch}
                            />
                        </div>
                    )}
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            aria-label="show 4 new mails"
                            color="inherit"
                        >
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu()}
        </div>
    );
};

export default withRouter(TopNav);
