import "./TimeZone.scss";
import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
const $ = require("jquery");

interface TimeZoneViewProps {
  data: any;
}

const TimeZoneView: React.FC<TimeZoneViewProps> = props => {
  useEffect(() => {
    console.log($("#searchField"));
    const search = $("#searchField").omniSearch();
    const currentDate = new Date();
    const searchItems = props.data.map((item: any) => {
      console.log(item);
    });

    search.omniSearch("open", searchItems, handleSelect);
  }, [props.data]);

  return (
    <div>
      <Typography>Please select your time zone.</Typography>
      <TextField id="searchField"></TextField>
    </div>
  );
};

const handleSelect = (el: any) => {
  console.log(el);
};

export default TimeZoneView;
