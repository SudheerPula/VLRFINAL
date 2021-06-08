import React from "react";
import { Route, Redirect } from "react-router-dom";
import { routes } from "./routes";

/**
 * @param {React.Component} Component
 * @param {Boolean} authenticated
 * @param {Array} rest
 */

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: routes.LOGIN,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
