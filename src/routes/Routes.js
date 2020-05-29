import React from "react";
import { Route, Switch } from "react-router-dom";
import Discover from "../discover/components/Discover";
import Login from "../login/Login";
import Register from "../login/Register";
import Confirmation from "../login/Confirmation";
import ResetPassword from "../login/ResetPassword";
import Account from "../account/components/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import Watch from "../watch/components/Watch";
import Search from "../search/components/Search";
import {
    LOGIN_URL,
    REGISTER_URL,
    CONFIRMATION_URL,
    ACCOUNT_URL,
    WATCH_URL,
    RESETPASSWORD_URL,
    SEARCH_URL,
} from "./URLMAP";
import Demo from "../watch/bulletComment/components/Demo";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Discover} />
            <Route exact path={LOGIN_URL} component={Login} />
            <Route exact path={REGISTER_URL} component={Register} />
            <Route exact path={CONFIRMATION_URL} component={Confirmation} />
            <Route path={RESETPASSWORD_URL} component={ResetPassword} />
            <Route path={`${WATCH_URL}/:videoId`} component={Watch} />
            <Route path={SEARCH_URL} component={Search} />
            <Route path="/demo" component={Demo} />
            <ProtectedRoute
                path={ACCOUNT_URL + "/:userId"}
                component={Account}
            />
        </Switch>
    );
};

export default Routes;
