import React from "react";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";

import DatePicker from "./DatePicker";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    margin: {
        marginBottom: theme.spacing(2),
    },
}));

const BasicInfo = (props) => {
    const { radioValue, handleRadiosChange } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TextField
                label="Username"
                id="outlined-margin-normal"
                className={classes.margin}
                defaultValue="*Current username"
                margin="normal"
                variant="outlined"
            />
            <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={radioValue}
                    onChange={handleRadiosChange}
                >
                    <FormControlLabel
                        value="female"
                        control={<Radio color="primary" />}
                        label="Female"
                    />
                    <FormControlLabel
                        value="male"
                        control={<Radio color="primary" />}
                        label="Male"
                    />
                    <FormControlLabel
                        value="other"
                        control={<Radio color="primary" />}
                        label="Other"
                    />
                </RadioGroup>
            </FormControl>
            <div className={classes.margin}>
                <DatePicker />
            </div>
            <TextField
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                fullWidth
                rows={2}
                defaultValue="Default Value"
                variant="outlined"
            />
        </div>
    );
};

export default BasicInfo;
