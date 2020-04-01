"use-strict";

import React from "react";
import { Typography, Container } from "@material-ui/core";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import HeaderBar from "../HeaderBar";
import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from "../../Utils/Constants";

interface LoginViewProps {
  handleLoginGoogleSuccess: Function;
  handleLoginGoogleFailure: Function;
  handleLoginFacebook: Function;
}

const LoginView: React.FC<LoginViewProps> = props => {
  return (
    <div>
      <HeaderBar />
      <Typography variant="subtitle1">
        Login with either Google or Facebook
      </Typography>
      <Container>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={response => props.handleLoginGoogleSuccess(response)}
          onFailure={response => props.handleLoginGoogleFailure(response)}
        />
      </Container>
      <Container>
        <FacebookLogin
          appId={FACEBOOK_APP_ID}
          fields="name,email,picture"
          callback={response => props.handleLoginFacebook(response)}
        />
      </Container>
    </div>
  );
};

export default LoginView;
