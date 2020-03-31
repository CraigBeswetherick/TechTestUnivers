"use-strict";

import history from "./History";
import { APP_NAME } from "./Constants";

export interface UserDetails {
  email: string;
  isAuthenticated: boolean;
  accessToken: string;
}

export let currentUser: UserDetails = {
  email: "",
  isAuthenticated: false,
  accessToken: ""
};

export const loginUser = (
  email: string,
  accessToken: string,
  callback: Function
) => {
  currentUser.email = email;
  currentUser.accessToken = accessToken;
  currentUser.isAuthenticated = true;

  localStorage.setItem(APP_NAME + "email", currentUser.email);
  localStorage.setItem(APP_NAME + "accessToken", currentUser.accessToken);

  callback(true);

  console.log("logged in user");
};

export const logoutUser = (callback: Function) => {
  currentUser.email = "";
  currentUser.accessToken = "";
  currentUser.isAuthenticated = false;

  localStorage.clear();
  callback(false);
  console.log("logging out user...", history);
};
