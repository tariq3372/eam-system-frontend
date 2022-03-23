import * as React from 'react'
import { Navigate } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/employee/Dashboard'
// import Reports from '../pages/employee/Reports'
import routeNames from './routesName'

const employeeRoutes = [
  {
    path: '/',
    element: <AdminLayout/>,
    children: [
      { path: routeNames.admin.dashboard, element: <Dashboard/> },
      // { path: routeNames.admin.reports, element: <Reports/> },
      { path: '/', element: <Navigate to={ routeNames.admin.dashboard }/> },
      { path: '*', element: <Navigate to={ routeNames.admin.dashboard }/> },
    ]
  }
]

export default employeeRoutes;