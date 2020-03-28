import React, { useState, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Router, Switch, Route } from "react-router-dom";
import { getData } from "./Utils/Database";
import history from "./Utils/History";
import Theme from "./Theme/Theme";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import Register from "./Components/Register";
import "typeface-roboto";

import "./App.scss";

const App: React.FC = props => {
  let parsedData: any;
  let app: any;

  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      await getData().then(function(results) {
        console.log(
          "%c Server responded with the following data: ",
          "background: #222; color: red; font-size:18px; font-weight: bold; padding:3px 5px;"
        );

        parsedData = [];

        results.recordsets[0].forEach((entry: any) => {
          let timezone = {
            name: entry.name,
            hours: entry.Hours,
            mins: entry.Mins,
            secs: entry.Secs
          };

          parsedData.push(timezone);

          // console.log(
          //   "%c " +
          //     entry.name +
          //     " \n" +
          //     " Hours : " +
          //     entry.Hours +
          //     " \n" +
          //     " Mins: " +
          //     entry.Mins +
          //     " \n" +
          //     " Secs: " +
          //     entry.Secs,
          //   "background: #222; color: white; font-size:12px; font-weight: bold; padding:3px 5px;"
          // );
        });

        setIsLoaded(true);
        setData(parsedData);
      });
    }

    loadData();
  }, [parsedData]);

  app = <div>Loading...</div>;
  console.log("rendering");
  if (isLoaded) {
    app = (
      <MuiThemeProvider theme={Theme}>
        <Router history={history}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/oauth_callback" component={LoginCallback} />
            <Route path="/home" component={HomePage} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }

  return app;
};

const LoginCallback = () => {};

export default App;
