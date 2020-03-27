import "./TimeZone.scss";
import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";

interface TimeZoneViewProps {
  data: any;
}

const TimeZoneView: React.FC<TimeZoneViewProps> = props => {
  useEffect(() => {
    // @ts-ignore
    const search = $("#searchField").omniSearch();
    $("#searchField").keydown(() => {
      search.omniSearch(
        "open",
        ["atari", "avocado", "asshat", "arctic"],
        handleSelect
      );
    });
  }, [props.data]);
  return (
    <div>
      <Typography>Please select your time zone.</Typography>
      <TextField id="searchField" className="omni-search"></TextField>
    </div>
  );
};

const handleSelect = (el: any) => {
  console.log(el);
};

export default TimeZoneView;
