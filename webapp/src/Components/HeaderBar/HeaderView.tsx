"use-strict";

import React from "react";
import Typography from "@material-ui/core/Typography";
import "./HeaderBar.scss";

const HeaderView: React.FC = props => {
  return (
    <header>
      <Typography variant="h1">Welcome to the tech test.</Typography>
    </header>
  );
};

export default HeaderView;
