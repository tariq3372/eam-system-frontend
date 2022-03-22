import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div style ={{ height: "100%" }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              Employee Attendance Management System
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              Employee Attendance Management System
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <div style={{ display: "flex", height: `calc(100% - 70px)` }} >
        <Outlet/>
      </div>
    </div>
  );
};
export default AuthLayout;
