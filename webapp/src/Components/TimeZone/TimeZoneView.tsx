"use-strict";

import "./TimeZone.scss";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

interface TimeZoneViewProps {
  data: any;
}

const TimeZoneView: React.FC<TimeZoneViewProps> = props => {
  if (!props.data) {
    return null;
  }

  const options = {
    options: props.data,
    getOptionLabel: (option: any) => option.name
  };

  return (
    <div>
      <Typography variant="subtitle1">Please select your time zone.</Typography>
      <Autocomplete
        {...options}
        id="autocomplete"
        renderInput={params => (
          <TextField {...params} label="Select your timezone" margin="normal" />
        )}
      />
    </div>
  );
};

export default TimeZoneView;
