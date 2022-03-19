import * as React from "react";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Page404 from "../pages/auth/Page404";

const authRoutes = [
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/", element: <Login />
            },
            {
                path: "*", element: <Page404 />
            }
        ]
    },
]


export default authRoutes;