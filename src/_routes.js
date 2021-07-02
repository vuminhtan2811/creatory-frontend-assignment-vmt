import React from "react";

const authLayout = React.lazy(() => import("./containers/layout"));
const login = React.lazy(() => import("./views/login"));
const employees = React.lazy(() => import("./views/employee/list"));
const employeeDetail = React.lazy(() => import("./views/employee/detail"));

const appRoutes = [
  {
    path: "/employees",
    exact: false,
    name: "Employees",
    component: employees,
    layout: authLayout,
  },
  {
    path: "/employee/:id",
    exact: true,
    name: "Employee Detail",
    component: employeeDetail,
    layout: authLayout,
  },
  {
    path: "/",
    exact: false,
    name: "Employees",
    component: employees,
    redirect: "/employees",
  },

  { path: "/login", exact: false, name: "Employees", component: login },
];

export default appRoutes;
