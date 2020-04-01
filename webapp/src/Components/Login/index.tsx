"use-strict";

import React from "react";
import LoginView from "./LoginView";
import { loginUser, logoutUser } from "../../Utils/User";

interface LoginInterface {
  authenticate: Function;
}

const Login: React.FC<LoginInterface> = props => {
  return (
    <LoginView
      handleLoginGoogleSuccess={(response: any) =>
        handleLoginGoogleSuccess(response, props.authenticate)
      }
      handleLoginGoogleFailure={(response: any) =>
        handleLoginGoogleFailure(response, props.authenticate)
      }
      handleLoginFacebook={(response: any) =>
        handleLoginFacebook(response, props.authenticate)
      }
    />
  );
};

const handleLoginGoogleSuccess = (response: any, callback: Function) => {
  console.log(
    "Google responded successfully with the following data: ",
    response
  );

  loginUser(response.profileObj.email, response.accessToken, callback);
};

const handleLoginGoogleFailure = (response: any, callback: Function) => {
  console.log("Google failed with the following data: ", response);
  logoutUser(callback);
};

const handleLoginFacebook = (response: any, callback: Function) => {
  console.log("Facebook responded with the following data: ", response);
  loginUser(response.email, response.accessToken, callback);
};

export default Login;
