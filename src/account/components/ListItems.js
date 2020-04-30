import React from "react";
import { Link } from "react-router-dom";
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
import { ACCOUNT_URL, ACCOUNT_SETTING_URL } from "../../routes/URLMAP";

const ListItems = (props) => {
    return (
        <>
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <VideoLibraryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Videos" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Favorite" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="History" />
                </ListItem>
                <Link
                    style={{ textDecoration: "none", color: "#000" }}
                    to={ACCOUNT_URL + ACCOUNT_SETTING_URL}
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
                <ListSubheader inset>Saved reports</ListSubheader>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Current month" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Last quarter" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Year-end sale" />
                </ListItem>
            </div>
        </>
    );
};

export default ListItems;
