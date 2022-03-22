import * as React from "react";
import { Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Page404 from "../pages/auth/Page404";

const authRoutes = [
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/login", element: <Login />
            },
            { 
                path: '*', element: <Navigate to='/login'/> 
            },
        ],

    },
]


export default authRoutes;