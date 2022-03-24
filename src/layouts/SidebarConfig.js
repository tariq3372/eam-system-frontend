import routeNames from '../routes/routesName';

const sidebarConfig = [
  { title: "Dashboard", path: routeNames.admin.dashboards },
  { title: "Department", path: routeNames.admin.departments },
  { title: "Job Title", path: routeNames.admin.jobTitles },
  { title: "Employee", path: routeNames.admin.employees },
  { title: "Leave Request", path: routeNames.admin.leaveRequests },
  { title: "Report", path: routeNames.admin.reports },
];

export default sidebarConfig;
