"use-strict";

import React, { useState, useEffect } from "react";
import HomePageView from "./HomePageView";
import { getData } from "../../Utils/Database";

interface HomePageProps {
  authenticate: Function;
}

const HomePage: React.FC<HomePageProps> = props => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let parsedData: any;

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
            hours: Number(entry.Hours),
            mins: Number(entry.Mins),
            secs: entry.Secs,

            convertedHours: "",
            convertedMinutes: ""
          };

          let today: Date = new Date();
          let nextHours: number = today.getUTCHours();
          nextHours += timezone.hours;
          today.setUTCHours(nextHours);
          let nextMinutes: number = today.getUTCMinutes();
          nextMinutes += timezone.mins;
          today.setUTCMinutes(nextMinutes);

          timezone.convertedHours = pad(today.getHours()).toString();
          timezone.convertedMinutes = pad(today.getMinutes()).toString();

          timezone.name +=
            " Local Time: " +
            timezone.convertedHours +
            ":" +
            timezone.convertedMinutes +
            ": 00";

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

        setIsLoaded(true);
        setData(parsedData);
      });
    }

    loadData();
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return <HomePageView data={data} authenticate={props.authenticate} />;
};

const pad = (n: number) => {
  return n < 10 ? "0" + n : n;
};

export default HomePage;
