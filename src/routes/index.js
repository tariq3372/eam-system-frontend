import * as React from "react";
import { useRoutes } from "react-router-dom";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";
import jwt_decode from "jwt-decode";
import employeeRoutes from "./employeeRoutes";

const Router = () => {
  const [currRoutes, setCurrRoutes] = React.useState(authRoutes);
  const token = localStorage.getItem('token');

  let decodedToken = token && jwt_decode(token);

  React.useEffect(() => {
    if (decodedToken?.role === "ADMIN") {
      setCurrRoutes(adminRoutes);
    } else if (decodedToken?.role === "EMPLOYEE") {
      setCurrRoutes(employeeRoutes);
    } else {
      setCurrRoutes(authRoutes);
    };
  }, [decodedToken]);

  return useRoutes(currRoutes);
}

export default Router;
