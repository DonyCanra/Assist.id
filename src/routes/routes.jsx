import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/common/Layout";
import Employee from "../pages/employeeList/EmployeeList";
import AddEmployee from "../pages/addEmployee/AddEmployee";
import EditEmployee from "../pages/editEmployee/EditEmployee";

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
