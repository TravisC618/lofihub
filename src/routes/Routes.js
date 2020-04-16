import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Album from "../demo/Album";
import { LOGIN_URL } from "./URLMAP";
import Login from "../login/Login";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Album} />
      <Route exact path={LOGIN_URL} component={Login} />
    </Switch>
  );
};

export default Routes;
