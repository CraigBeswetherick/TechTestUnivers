import React from "react";
import { TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

interface RegisterViewProps {
  callback: Function;
}

const RegisterView: React.FC<RegisterViewProps> = props => {
  return (
    <div>
      <Typography>Enter Username</Typography>
      <TextField></TextField>
      <Typography>Enter Password</Typography>
      <TextField></TextField>
      <Typography>Re-type Password</Typography>
      <TextField></TextField>
      <Button onClick={props.callback()}>Register</Button>
    </div>
  );
};

export default RegisterView;
