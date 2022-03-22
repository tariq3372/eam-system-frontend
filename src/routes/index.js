import * as React from "react";
import { useRoutes } from "react-router-dom";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";

const Router = () => {
  const [currRoutes, setCurrRoutes] = React.useState(authRoutes);
  const token = localStorage.getItem('token');
  React.useEffect(() => {
    if(token) {
      setCurrRoutes(adminRoutes);
    }
    else {
      setCurrRoutes(authRoutes);
    }
  }, [token]);
  return useRoutes(currRoutes);
}

export default Router;