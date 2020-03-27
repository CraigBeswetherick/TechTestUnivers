import "./TimeZone.scss";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

interface TimeZoneViewProps {
  data: any;
}

const TimeZoneView: React.FC<TimeZoneViewProps> = props => {
  const options = {
    options: props.data,
    getOptionLabel: (option: any) => option.name
  };

  console.log(props, "data");

  return (
    <div>
      <Typography>Please select your time zone.</Typography>
      <Autocomplete
        {...options}
        id="disable-close-on-select"
        disableCloseOnSelect
        renderInput={params => (
          <TextField {...params} label="disableCloseOnSelect" margin="normal" />
        )}
      />
    </div>
  );
};

export default TimeZoneView;
