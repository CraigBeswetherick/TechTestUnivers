import React from "react";
import { TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

interface LoginViewProps {
  callback: Function;
}

const LoginView: React.FC<LoginViewProps> = props => {
  return (
    <div>
      <Typography>Enter Username</Typography>
      <TextField></TextField>
      <Typography>Enter Password</Typography>
      <TextField></TextField>
      <Button onClick={props.callback()}>Login</Button>
    </div>
  );
};

export default LoginView;
