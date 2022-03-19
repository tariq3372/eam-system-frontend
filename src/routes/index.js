import * as React from "react";
import { useRoutes } from "react-router-dom";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";

const Router = () => {
  const token = localStorage.getItem('token');
  return useRoutes(authRoutes);
}

export default Router;