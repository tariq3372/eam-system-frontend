import routeNames from '../routes/routesName';
import { DirectionsCar } from '@mui/icons-material';

const sidebarConfig = [
  { title: "Dashboard", path: routeNames.admin.dashboard },
  { title: "Department", path: routeNames.admin.departments },
  { title: "Job Title", path: routeNames.admin.jobTitles },
  { title: "Employee", path: routeNames.admin.employees },
  { title: "Report", path: routeNames.admin.reports },
];

export default sidebarConfig;
