import React from "react";
import { Route, Switch } from "react-router-dom";
import Discover from "../discover/components/Discover";
import { LOGIN_URL, REGISTER_URL, ACCOUNT_URL } from "./URLMAP";
import Login from "../login/Login";
import Register from "../login/Register";
import Account from "../account/components/Account";
import ProtectedRoute from "./components/ProtectedRoute";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Discover} />
            <Route exact path={LOGIN_URL} component={Login} />
            <Route exact path={REGISTER_URL} component={Register} />
            <ProtectedRoute
                path={ACCOUNT_URL + "/:userId"}
                component={Account}
            />
        </Switch>
    );
};

export default Routes;
