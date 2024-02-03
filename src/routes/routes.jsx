import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/common/Layout";
import Employee from "../pages/Employee/employeeList/EmployeeList";
import AddEmployee from "../pages/Employee/addEmployee/AddEmployee";
import EditEmployee from "../pages/Employee/editEmployee/EditEmployee";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Employee />,
      },
      {
        path: "/add-employee",
        element: <AddEmployee />,
      },
      {
        path: "/edit-employee/:id",
        element: <EditEmployee />,
      },
    ],
  },
]);

export default router;
