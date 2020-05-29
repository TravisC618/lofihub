import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Typography from "@material-ui/core/Typography";
import { strengthValidatiton } from "../utils/validator";

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
});

export default function PwdStrengthIndicator(props) {
    const classes = useStyles();
    const { currentPwd } = props;
    const [activeStep, setActiveStep] = useState(0);
    useEffect(() => {
        const strength = strengthValidatiton(currentPwd);
        switch (strength) {
            case "Low":
                setActiveStep(1);
                break;
            case "Middle":
                setActiveStep(2);
                break;
            case "High":
                setActiveStep(3);
                break;
            default:
                setActiveStep(0);
        }
    }, [currentPwd]);

    return (
        <>
            <MobileStepper
                variant="progress"
                steps={4}
                position="static"
                activeStep={activeStep}
                className={classes.root}
            />
            <Typography variant="caption" display="block" gutterBottom>
                {strengthValidatiton(currentPwd)}
            </Typography>
        </>
    );
}
