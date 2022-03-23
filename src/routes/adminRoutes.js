import * as React from 'react'
import { Navigate } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/admin/Dashboard'
import Department from '../pages/admin/Department'
import Employee from '../pages/admin/Employee'
import JobTitle from '../pages/admin/JobTitle'
import Report from '../pages/admin/Report'
import routeNames from './routesName'

const adminRoutes = [
  {
    path: '/',
    element: <AdminLayout/>,
    children: [
      { path: routeNames.admin.dashboard, element: <Dashboard/> },
      { path: routeNames.admin.departments, element: <Department/> },
      { path: routeNames.admin.jobTitles, element: <JobTitle/> },
      { path: routeNames.admin.employees, element: <Employee/> },
      { path: routeNames.admin.reports, element: <Report/> },
      { path: '/', element: <Navigate to={ routeNames.admin.dashboard }/> },
      { path: '*', element: <Navigate to={ routeNames.admin.dashboard }/> },
    ]
  }
]

export default adminRoutes;