import React from "react";
import RegisterView from "./RegisterView";

const Register: React.FC = props => {
  return <RegisterView callback={handleRegister} />;
};

const handleRegister = () => {};

export default Register;
