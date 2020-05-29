import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import HistoryIcon from "@material-ui/icons/History";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: "auto",
    },
});

export default function NavDrawer(props) {
    const classes = useStyles();
    const { isDrawerOpen, setIsDrawOpen } = props;

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={() => setIsDrawOpen(false)}
            onKeyDown={() => setIsDrawOpen(false)}
        >
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <WhatshotIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Trending"} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <SubscriptionsIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Subscriptions"} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText primary={"History"} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ThumbUpAltIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Liked Videos"} />
                </ListItem>
            </List>
            <Divider />
            <List>
                {["baba", "lala", "lolo"].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment>
                <Drawer
                    anchor="left"
                    open={isDrawerOpen}
                    transitionDuration={500}
                    onClose={() => setIsDrawOpen(false)}
                >
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
