import React from "react";
import LoginView from "./LoginView";

const Login: React.FC = props => {
  return <LoginView callback={handleLogin} />;
};

const handleLogin = () => {};

export default Login;
