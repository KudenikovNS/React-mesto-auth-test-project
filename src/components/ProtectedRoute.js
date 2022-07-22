import React from "react";
import { Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...props }) => {
  return props.loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />;
};
