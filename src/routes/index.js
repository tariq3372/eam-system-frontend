import * as React from "react";
import { useRoutes } from "react-router-dom";
import authRoutes from "./authRoutes";

const Router = () => {
  return useRoutes(authRoutes);

}

export default Router;