"use-strict";

import React from "react";
import Button from "@material-ui/core/Button";

interface LogoutButtonViewInterface {
  callback: Function;
}

const LogoutButtonView: React.FC<LogoutButtonViewInterface> = props => {
  return (
    <Button color="primary" variant="text" onClick={() => props.callback()}>
      Logout
    </Button>
  );
};

export default LogoutButtonView;
