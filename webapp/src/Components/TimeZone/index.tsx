"use-strict";

import React from "react";
import TimeZoneView from "./TimeZoneView";

interface TimeZoneProps {
  data: any;
}

const TimeZone: React.FC<TimeZoneProps> = props => {
  return <TimeZoneView data={props.data} />;
};

export default TimeZone;
