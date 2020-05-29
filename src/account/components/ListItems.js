import React from "react";
import { Link, withRouter } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HistoryIcon from "@material-ui/icons/History";
import SettingsIcon from "@material-ui/icons/Settings";
import AssignmentIcon from "@material-ui/icons/Assignment";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import Divider from "@material-ui/core/Divider";
import { getUserId } from "../../utils/auth";
import {
    ACCOUNT_URL,
    ACCOUNT_DASHBOARD_URL,
    ACCOUNT_VIDEOS_URL,
    ACCOUNT_FAVORITE_URL,
    ACCOUNT_HISTORY_URL,
    ACCOUNT_SETTING_URL,
} from "../../routes/URLMAP";

const ListItems = ({ match, location }) => {
    return (
        <>
            <div>
                <Link
                    style={{ textDecoration: "none", color: "#000" }}
                    to={ACCOUNT_URL + `/${getUserId()}` + ACCOUNT_DASHBOARD_URL}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </Link>
                <Link
                    style={{ textDecoration: "none", color: "#000" }}
                    to={ACCOUNT_URL + `/${getUserId()}` + ACCOUNT_VIDEOS_URL}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <VideoLibraryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Videos" />
                    </ListItem>
                </Link>
                <Link
                    style={{ textDecoration: "none", color: "#000" }}
                    to={ACCOUNT_URL + `/${getUserId()}` + ACCOUNT_FAVORITE_URL}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <FavoriteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Favorite" />
                    </ListItem>
                </Link>
                <Link
                    style={{ textDecoration: "none", color: "#000" }}
                    to={ACCOUNT_URL + `/${getUserId()}` + ACCOUNT_HISTORY_URL}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <HistoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="History" />
                    </ListItem>
                </Link>
                <Link
                    style={{ textDecoration: "none", color: "#000" }}
                    to={location.pathname + ACCOUNT_SETTING_URL}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                </Link>
            </div>
            <Divider />

            <div>
                <ListSubheader inset>Customized buttons</ListSubheader>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Button 1" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Button 2" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Button 3" />
                </ListItem>
            </div>
        </>
    );
};

export default withRouter(ListItems);
