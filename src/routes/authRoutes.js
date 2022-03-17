import * as React from "react";
import Login from "../pages/auth/Login";
import Page404 from "../pages/auth/Page404";

const authRoutes = [
    {
        path: "/",
        element: <Login />,
    },
    { path: "*", element: <Page404 /> },
]


export default authRoutes;