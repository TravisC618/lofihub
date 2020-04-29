import React, { useState } from "react";
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

export default function Settings(props) {
    const { openSettings, handleSettingsClose } = props;
    const theme = useTheme();
    const classes = useStyles();
    const [tabValue, setTabValue] = useState(0);
    const [radioValue, setRadioValue] = useState("male");
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const handleTabsChange = (event, newTab) => {
        setTabValue(newTab);
    };

    const handleRadiosChange = (event) => {
        setRadioValue(event.target.value);
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={openSettings}
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
                <TabPanel value={tabValue} index={0}>
                    <BasicInfo
                        radioValue={radioValue}
                        handleRadiosChange={handleRadiosChange}
                    />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    Item Three
                </TabPanel>
            </div>

            <Button size="small">Save</Button>
        </Dialog>
    );
}
