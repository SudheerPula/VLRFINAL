import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  Inventory,
  ForgotPassword,
  Home,
  Login,
  ResetLink,
  
} from "./components";
import VerticalTabs from "./components/Admin/Admin";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import { routes } from "./routes";

const AppRoutes = ({ authenticated }) => {
  return (
    <Switch>
      <Route
        exact
        path={routes.HOME}
        render={() => (
          <Redirect
            to={{
              pathname: authenticated ? routes.INVENTORY : routes.LOGIN,
            }}
          />
        )}
      />
       <Route
        path={routes.FORGETPASSWORD}        
        exact
        component={() => <ForgotPassword />}
      />
      <Route
        path={routes.RESETLINK}
        exact
        
        component={() => <ResetLink />}
      />
      <Route exact path={routes.LOGIN} component={() => <Login />} />
      <PrivateRoute
        path={routes.INVENTORY}
        exact
        component={() => <Inventory />}
        authenticated={authenticated}
      />
      <PrivateRoute
        path={routes.PROFILE}
        exact
        component={() => <Profile />}
        authenticated={authenticated}
      />
      <PrivateRoute
        path={routes.ADMIN}
        exact
        component={() => <VerticalTabs />}
        authenticated={authenticated}
      />
      <PrivateRoute
        path={routes.HOMECONTENT}
        exact
        component={() => <Home />}
        authenticated={authenticated}
      />
        
     {/* <Redirect from ="*" to="/" />*/}
    </Switch>
  );
};

export default AppRoutes;
