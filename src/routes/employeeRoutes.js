import * as React from 'react'
import { Navigate } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import Dashboards from '../pages/employee/Dashboards'
// import Reports from '../pages/employee/Reports'
import routeNames from './routesName'

const employeeRoutes = [
  {
    path: '/',
    element: <AdminLayout/>,
    children: [
      { path: routeNames.admin.dashboard, element: <Dashboards/> },
      // { path: routeNames.admin.reports, element: <Reports/> },
      { path: '/', element: <Navigate to={ routeNames.admin.dashboard }/> },
      { path: '*', element: <Navigate to={ routeNames.admin.dashboard }/> },
    ]
  }
]

export default employeeRoutes;