import routeNames from '../routes/routesName';
import { DirectionsCar } from '@mui/icons-material';

const sidebarConfig = [
  { title: "Dashboard", path: routeNames.admin.dashboard },
  { title: "Employee", path: routeNames.admin.employees },
  { title: "Department", path: routeNames.admin.departments },
  { title: "Job Title", path: routeNames.admin.jobTitles },
];

export default sidebarConfig;
