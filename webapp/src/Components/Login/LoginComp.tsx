import React, { FC, useState, useEffect, useCallback } from "react";
import { Card, Button } from "@material-ui/core";
import styled from "@emotion/styled";

import { Google } from "./config";

const StyledCard = styled(Card)`
  padding: 20px;
  margin: 100px auto;
  max-width: 40vw;
  min-width: 300px;
`;

const LoginComp: FC = () => {
  const handleGoogleLogin = useCallback(async () => {
    const qParams = [
      `redirect_uri=${Google.REDIRECT_URI}`,
      `scope=${Google.SCOPE}`,
      `login_hint=paramsinghvc@gmail.com`,
      `prompt=consent`,
      `state=google`
    ].join("&");

    try {
      const response = await fetch(`/api/auth-url/google?${qParams}`);
      const url = await response.text();
      window.location.assign(url);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <StyledCard>
      <Button variant="contained" color="primary" onClick={handleGoogleLogin}>
        Login with Google
      </Button>
    </StyledCard>
  );
};

export default LoginComp;
