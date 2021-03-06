import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../api/user";
import { setToken, setUserId } from "../utils/auth";
import {
    REGISTER_URL,
    ACCOUNT_URL,
    ACCOUNT_DASHBOARD_URL,
    RESETPASSWORD_URL,
} from "../routes/URLMAP";
import LoadingSpinner from "../UI/LoadingSpinner";
import { wechatAuthorize } from "../api/wechat";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Lofihub
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    image: {
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = (props) => {
    const { history, location } = props;
    const classes = useStyles();
    const [form, setForm] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(null);

    const handleChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setForm({ ...form, [key]: value });
    };

    const handleLogin = async () => {
        setIsLoading(true);
        setErr(null);
        let response;
        try {
            response = await login(form);
            setIsLoading(false);
            const { userId, token } = response.data.data;
            setToken(token);
            setUserId(userId);
            const locationState = location.state;
            const redirectTo =
                (locationState && locationState.from) ||
                ACCOUNT_URL + `/${userId}` + ACCOUNT_DASHBOARD_URL;
            history.replace(redirectTo);
        } catch (error) {
            setIsLoading(false);
            if (error.response) {
                setErr(error.response.data.error);
            }
        }
    };

    const handleWechatLogin = async () => {
        const response = await wechatAuthorize();
        const authURL = response.data.authUrl;
        window.location.href = authURL; // redirect to external links
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                {isLoading && <LoadingSpinner />}

                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={form.email}
                            onChange={handleChange}
                            error={err}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={form.password}
                            onChange={handleChange}
                            error={err}
                            helperText={err}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleLogin}
                        >
                            Login In
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={handleWechatLogin}
                        >
                            Wechat Login
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link variant="body2" to={RESETPASSWORD_URL}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to={REGISTER_URL} variant="body2">
                                    {"Don't have an account? Register"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default withRouter(Login);
