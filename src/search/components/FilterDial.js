import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FilterListIcon from "@material-ui/icons/FilterList";
import Backdrop from "@material-ui/core/Backdrop";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import CategoryIcon from "@material-ui/icons/Category";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SortIcon from "@material-ui/icons/Sort";
import ScheduleIcon from "@material-ui/icons/Schedule";
import FilterItemMenu from "./FilterItemMenu";
import "../styles/filterDial.scss";
import { Tooltip, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        height: 100,
        marginTop: 20,
        marginBottom: 10,
        transform: "translateZ(0px)",
        flexGrow: 1,
        "& button": {
            outline: 0,
        },
    },
    speedDial: {
        position: "absolute",
        width: "100%",
        "&.MuiSpeedDial-directionRight": {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
    },
}));

const sortOptions = ["Upload date", "View count", "Rating"];

const dateOptions = [
    "Last hour",
    "Today",
    "This week",
    "This month",
    "This year",
];

const categoryOptions = ["Comedy", "Sports", "Music", "Animation", "Travel"];

const durationOptions = ["Short (< 4 mins)", "Long (> 20 mins)"];

export default function FilterDial() {
    const classes = useStyles();
    const [openDial, setOpenDial] = useState(false);

    const [hidden, setHidden] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currItem, setCurrItem] = useState("");
    const [currOptions, setCurrOptions] = useState({
        sort: "SORT",
        date: "DATE",
        category: "CATEGORY",
        duration: "DURATION",
    });
    const openMenu = Boolean(anchorEl);

    const actions = [
        { icon: <SortIcon />, name: currOptions.sort, key: "sort" },
        { icon: <DateRangeIcon />, name: currOptions.date, key: "date" },
        { icon: <CategoryIcon />, name: currOptions.category, key: "category" },
        { icon: <ScheduleIcon />, name: currOptions.duration, key: "duration" },
    ];

    const handleOpen = () => {
        setOpenDial(true);
    };

    const handleClose = () => {
        setOpenDial(false);
    };

    const handleAnchorElOpen = (event, action) => {
        setCurrItem(action.key);
        setAnchorEl(event.currentTarget);
    };

    const handleAnchorElClose = () => {
        setAnchorEl(null);
    };

    const handleOptionSelect = (itemName, option) => {
        if (option === currOptions[itemName]) {
            option = itemName.toUpperCase();
        }

        setCurrOptions({ ...currOptions, [itemName]: option });
        setAnchorEl(null);
    };

    const handleReset = () => {
        setCurrOptions({
            sort: "SORT",
            date: "DATE",
            category: "CATEGORY",
            duration: "DURATION",
        });
    };

    const renderFilterItem = () => {
        switch (currItem) {
            case "sort":
                return (
                    <FilterItemMenu
                        itemName={currItem}
                        anchorEl={anchorEl}
                        openMenu={openMenu}
                        handleOptionSelect={handleOptionSelect}
                        handleAnchorElClose={handleAnchorElClose}
                        options={sortOptions}
                    />
                );
            case "date":
                return (
                    <FilterItemMenu
                        itemName={currItem}
                        anchorEl={anchorEl}
                        openMenu={openMenu}
                        handleOptionSelect={handleOptionSelect}
                        handleAnchorElClose={handleAnchorElClose}
                        options={dateOptions}
                    />
                );

            case "category":
                return (
                    <FilterItemMenu
                        itemName={currItem}
                        anchorEl={anchorEl}
                        openMenu={openMenu}
                        handleOptionSelect={handleOptionSelect}
                        handleAnchorElClose={handleAnchorElClose}
                        options={categoryOptions}
                    />
                );
            case "duration":
                return (
                    <FilterItemMenu
                        itemName={currItem}
                        anchorEl={anchorEl}
                        openMenu={openMenu}
                        handleOptionSelect={handleOptionSelect}
                        handleAnchorElClose={handleAnchorElClose}
                        options={durationOptions}
                    />
                );
            default:
                break;
        }
    };

    return (
        <div className={classes.root}>
            <SpeedDial
                ariaLabel="FilterDial tooltip"
                className={classes.speedDial}
                hidden={hidden}
                icon={
                    <Tooltip title="Reset Filter">
                        <IconButton
                            onClick={handleReset}
                            aria-label="filter-reset"
                        >
                            <FilterListIcon style={{ color: "#fff" }} />
                        </IconButton>
                    </Tooltip>
                }
                onClose={handleClose}
                onOpen={handleOpen}
                open={true}
                direction="right"
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={(event) => handleAnchorElOpen(event, action)}
                    />
                ))}
            </SpeedDial>

            {renderFilterItem()}
        </div>
    );
}
