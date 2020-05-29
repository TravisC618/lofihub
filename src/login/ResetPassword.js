import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import EmailIcon from "@material-ui/icons/Email";
import { Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { findPassword, resetPassword } from "../api/user";
import { passwordValidation } from "../utils/validator";
import LoadingSpinner from "../UI/LoadingSpinner";
import { LOGIN_URL } from "../routes/URLMAP";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    title: {
        textAlign: "center",
        marginTop: theme.spacing(3),
    },
    emailInput: {
        width: "350px",
    },
    marginBottom: {
        marginBottom: theme.spacing(3),
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

function getSteps() {
    return ["Confirm your email", "Reset password", "Reset successfully"];
}

function getStepContent(
    step,
    classes,
    email,
    emailOptions,
    handleEmailInput,
    handlePasswordInput,
    response,
    err
) {
    switch (step) {
        case 0:
            return (
                <Grid container spacing={1} alignItems="center">
                    <Grid item>
                        <EmailIcon />
                    </Grid>
                    <Grid item className={classes.emailInput}>
                        <Autocomplete
                            // autoComplete
                            freeSolo
                            options={emailOptions}
                            onChange={(e, v) => handleEmailInput(v)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={err.type === "email"}
                                    helperText={
                                        err.type === "email"
                                            ? err.msg
                                            : response
                                    }
                                    label="Email"
                                    value={email}
                                    onChange={(event) => {
                                        handleEmailInput(event.target.value);
                                    }}
                                    variant="outlined"
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            );
        case 1:
            return (
                <Grid
                    container
                    direction="column"
                    spacing={1}
                    className={classes.emailInput}
                >
                    <TextField
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        className={classes.marginBottom}
                        onChange={handlePasswordInput}
                        error={err.type === "password"}
                        helperText={err.type === "password" && err.msg}
                    />
                    <TextField
                        name="repeatPwd"
                        type="password"
                        label="Repeat password"
                        variant="outlined"
                        className={classes.marginBottom}
                        onChange={handlePasswordInput}
                        error={err.type === "password"}
                        helperText={err.type === "password" && err.msg}
                    />
                </Grid>
            );
        case 2:
            return `Congratulations! Your password has now been reset.`;
        default:
            return "Unknown step";
    }
}

export default function ResetPassword({
    location: { pathname: currentPath },
    history,
}) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const [email, setEmail] = useState("");
    const [info, setInfo] = useState({
        password: "",
        repeatPwd: "",
    });

    const emailOptions = [
        `${email}@gmail.com`,
        `${email}@outlook.com`,
        `${email}@yahoo.com`,
        `${email}@icloud.com`,
        `${email}@163.com`,
        `${email}@qq.com`,
    ];
    const [isVerify, setIsVerify] = useState(false);
    const [token, setToken] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState("");
    const [err, setErr] = useState({
        type: "",
        msg: "",
    });

    useEffect(() => {
        const pathArr = currentPath.split("/");
        const token = pathArr[pathArr.length - 1];
        setToken(token);
        if (token === "reset-password") return;
        setActiveStep(1);
    }, [currentPath]);

    const handleEmailInput = (value) => {
        setEmail(value);
    };

    const handlePasswordInput = (event) => {
        const key = event.target.name;
        const value = event.target.value;

        setInfo({ ...info, [key]: value });
    };

    const handleFindPwd = async () => {
        setIsLoading(true);
        try {
            const response = await findPassword({ email });
            setResponse(response.data.data);
            setIsLoading(false);
        } catch (error) {
            if (error.response) {
                setErr({
                    type: "email",
                    msg: error.response.data.error,
                });
            }
            setIsLoading(false);
        }
    };

    const handleResetPwd = async () => {
        setIsLoading(true);
        try {
            const response = await resetPassword(token, info.password);
            setResponse(response.data.data);
            setIsLoading(false);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } catch (error) {
            if (error.response) {
                setErr({
                    type: "password",
                    msg: error.response.data.error,
                });
            }
            setIsLoading(false);
        }
    };

    const handleNext = async () => {
        setErr({ type: "", msg: "" });
        switch (activeStep) {
            case 0:
                await handleFindPwd();
                break;
            case 1:
                const err = passwordValidation(info);
                if (err) {
                    setErr(err);
                    return;
                }
                await handleResetPwd();
                break;
            case 2:
                history.replace(LOGIN_URL);
                break;
            default:
                break;
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            {isLoading && <LoadingSpinner />}
            <h3 className={classes.title}>Reset Password</h3>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography>
                                {getStepContent(
                                    index,
                                    classes,
                                    email,
                                    emailOptions,
                                    handleEmailInput,
                                    handlePasswordInput,
                                    response,
                                    err
                                )}
                            </Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    {activeStep !== steps.length - 1 && (
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.button}
                                        >
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1
                                            ? "Back to login pages"
                                            : "Next"}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Reset
                    </Button>
                </Paper>
            )}
        </div>
    );
}
