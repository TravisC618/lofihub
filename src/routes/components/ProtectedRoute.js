import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";
import { LOGIN_URL } from "../URLMAP";

const ProtectedRoute = ({ component: ProtectedComponent, ...rest }) => {
    return (
        <Route
            {...rest} // exact, path ... (attributes that from the origin route)
            render={(routeProps) => {
                if (!isLoggedIn()) {
                    return (
                        <Redirect
                            to={{
                                pathname: LOGIN_URL,
                                state: { from: routeProps.location.pathname },
                            }}
                        />
                    );
                }
                return <ProtectedComponent {...routeProps} />;
            }}
        />
    );
};

export default ProtectedRoute;
