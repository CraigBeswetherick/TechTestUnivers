import React from "react";
import HeaderBar from "./Components/HeaderBar";
import TimeZone from "./Components/TimeZone";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { getData } from "./Utils/Database";
import Theme from "./Theme/Theme";
import "typeface-roboto";

import "./App.scss";

function App() {
  let parsedData;

  getData().then(function(results) {
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

      console.log(
        "%c " +
          entry.name +
          " \n" +
          " Hours : " +
          entry.Hours +
          " \n" +
          " Mins: " +
          entry.Mins +
          " \n" +
          " Secs: " +
          entry.Secs,
        "background: #222; color: white; font-size:12px; font-weight: bold; padding:3px 5px;"
      );
    });
  });

  return (
    <MuiThemeProvider theme={Theme}>
      <HeaderBar />
      <div className="App">
        <TimeZone data={parsedData} />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
