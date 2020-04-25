import React from "react";
import { Route, Switch } from "react-router-dom";
import Discover from "../discover/components/Discover";
import { LOGIN_URL } from "./URLMAP";
import Login from "../discover/login/Login";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Discover} />
      <Route exact path={LOGIN_URL} component={Login} />
    </Switch>
  );
};

export default Routes;
