/* eslint-disable no-use-before-define */
import React from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        "& > * + *": {
            marginTop: theme.spacing(3),
        },
    },
}));

export default function CategorySelector({ cateInform, handleCategoryChange }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Autocomplete
                multiple
                name="category"
                options={categoryOptions}
                getOptionLabel={(option) => option}
                value={cateInform}
                defaultValue={cateInform}
                filterSelectedOptions
                onChange={(event, newValue) => handleCategoryChange(newValue)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Category"
                        placeholder="Select more to rank your video in Lofihub results."
                    />
                )}
            />
        </div>
    );
}

const categoryOptions = [
    "Comedy",
    "Sports",
    "Music",
    "Life",
    "Animation",
    "Travel",
    "Entertainment",
    "Animals",
    "Educations",
    "Unboxing",
    "Pranks",
    "Parodies",
];
