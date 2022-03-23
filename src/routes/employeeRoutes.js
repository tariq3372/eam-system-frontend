import * as React from 'react'
import { Navigate } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/employee/Dashboard'
import Report from '../pages/employee/Report'
import routeNames from './routesName'

const employeeRoutes = [
  {
    path: '/',
    element: <AdminLayout/>,
    children: [
      { path: routeNames.employee.dashboards, element: <Dashboard/> },
      { path: routeNames.employee.reports, element: <Report/> },
      { path: '/', element: <Navigate to={ routeNames.employee.dashboards }/> },
      { path: '*', element: <Navigate to={ routeNames.employee.dashboards }/> },
    ]
  }
]

export default employeeRoutes;