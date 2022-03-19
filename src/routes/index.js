import * as React from "react";
import { useRoutes } from "react-router-dom";
import authRoutes from "./authRoutes";

const Router = () => {
  const token = localStorage.getItem('token');
  return useRoutes(authRoutes);

}

export default Router;