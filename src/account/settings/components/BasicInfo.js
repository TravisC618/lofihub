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
    const { userInfo, handleInfoChange, handleBDayChange } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TextField
                label="Username"
                name="username"
                variant="outlined"
                className={classes.margin}
                defaultValue={userInfo.username}
                margin="normal"
                onChange={handleInfoChange}
            />
            <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={userInfo.gender}
                    onChange={handleInfoChange}
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
                <DatePicker
                    birthday={userInfo.birthday}
                    handleBDayChange={handleBDayChange}
                />
            </div>
            <TextField
                label="Introduction"
                name="introduction"
                multiline
                fullWidth
                variant="outlined"
                rows={2}
                defaultValue={userInfo.introduction}
                onChange={handleInfoChange}
            />
        </div>
    );
};

export default BasicInfo;
