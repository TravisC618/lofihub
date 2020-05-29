import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";

export default function DatePicker(props) {
    const { birthday, handleBDayChange } = props;

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid justify="space-around">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    name="birthday"
                    label="Birthday"
                    value={birthday}
                    onChange={handleBDayChange}
                    KeyboardButtonProps={{
                        "aria-label": "change date",
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
