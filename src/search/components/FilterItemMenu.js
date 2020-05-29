import React from "react";
import { Menu, MenuItem } from "@material-ui/core";

const FilterItemMenu = ({
    itemName,
    anchorEl,
    openMenu,
    handleOptionSelect,
    handleAnchorElClose,
    options,
}) => {
    return (
        <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={openMenu}
            onClose={handleAnchorElClose}
            PaperProps={{
                style: {
                    width: "20ch",
                },
            }}
        >
            {options.map((option) => (
                <MenuItem
                    key={option}
                    name={itemName}
                    selected={option === "Pyxis"}
                    onClick={() => handleOptionSelect(itemName, option)}
                >
                    {option}
                </MenuItem>
            ))}
        </Menu>
    );
};

export default FilterItemMenu;
