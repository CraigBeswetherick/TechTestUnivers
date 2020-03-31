"use-strict";

import React from "react";
import LogoutButtonView from "./LogoutView";
import { logoutUser } from "../../../Utils/User";

interface LogoutButton {
  authenticate: Function;
}

const LogoutButton: React.FC<LogoutButton> = props => {
  return <LogoutButtonView callback={() => logoutUser(props.authenticate)} />;
};

export default LogoutButton;
