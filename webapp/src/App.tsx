"use-strict";

import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Router, Switch, Route } from "react-router-dom";
import history from "./Utils/History";
import Theme from "./Theme/Theme";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import { currentUser } from "./Utils/User";
import { APP_NAME } from "./Utils/Constants";

import "typeface-roboto";
import "./App.scss";

const App: React.FC = props => {
  currentUser.email = localStorage.getItem(APP_NAME + "email") || "";
  currentUser.accessToken =
    localStorage.getItem(APP_NAME + "accessToken") || "";

  if (currentUser.email.length > 0) {
    currentUser.isAuthenticated = true;
  }

  const [isAuthenticated, setIsAuthenticated] = useState(
    currentUser.isAuthenticated
  );

  return (
    <MuiThemeProvider theme={Theme}>
      <Router history={history}>
        <Switch>
          {isAuthenticated ? (
            <Route
              path="/"
              render={() => <HomePage authenticate={setIsAuthenticated} />}
            />
          ) : (
            <Route
              exact
              path="/"
              render={() => <Login authenticate={setIsAuthenticated} />}
            />
          )}
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
