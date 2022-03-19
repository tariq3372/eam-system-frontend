import * as React from 'react'
import { Navigate } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import Dashboards from '../pages/admin/Dashboards'
import Departments from '../pages/admin/Departments'
import Employees from '../pages/admin/Employees'
import JobTitles from '../pages/admin/JobTitles'
import routeNames from './routesName'

const adminRoutes = [
  {
    path: '/',
    element: <AdminLayout/>,
    children: [
      { path: routeNames.admin.dashboard, element: <Dashboards/> },
      { path: routeNames.admin.departments, element: <Departments/> },
      { path: routeNames.admin.jobTitles, element: <JobTitles/> },
      { path: routeNames.admin.employees, element: <Employees/> },
      { path: '*', element: <Navigate to={ routeNames.admin.dashboard }/> },
    ]
  }
]

export default adminRoutes;