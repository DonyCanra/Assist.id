import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "../components/common/Layout";
import Login from "../components/auth/Login";
import CreatePassword from "../components/auth/CreatePassword";
import ForgotPassword from "../components/auth/ForgotPassword";
import Dashboard from "../components/pages/Dashboard/dashboard/Dashboard";
import Profile from "../components/pages/Dashboard/profile/Profile";
import ChangePassword from "../components/pages/Dashboard/changePassword/ChangePassword";
import EditProfile from "../components/pages/Dashboard/editProfile/EditProfile";
import Employee from "../components/pages/Employee/employeeList/EmployeeList";
import AddEmployee from "../components/pages/Employee/addEmployee/AddEmployee";
import AddEmployeeBulk from "../components/pages/Employee/addEmployee/AddEmployeeDataBulk";
import EditEmployee from "../components/pages/Employee/editEmployee/EditEmployee";
import Candidate from "../components/pages/Employee/candidateList/Candidate";
import DetailEmployee from "../components/pages/Employee/detailEmployee/DetailEmployee";
import Fee from "../components/pages/Fee/Fee";
import DetailFee from "../components/pages/Fee/detailFee/DetailFee";
import UserList from "../components/pages/Setting/userList/User";
import AddUser from "../components/pages/Setting/addUser/AddUser";
import EditUser from "../components/pages/Setting/editUser/EditUser";
import Role from "../components/pages/Setting/role/Role";
import AddRole from "../components/pages/Setting/addRole/AddRole";
import EditRole from "../components/pages/Setting/editRole/EditRole";

const router = createBrowserRouter([
  {
    element: <Layout />,
    loader: () => {
      const tokenDashboard = localStorage.getItem("tokenDashboard");
      if (!tokenDashboard) {
        throw redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/edit-profile/:id",
        element: <EditProfile />,
      },
      {
        path: "/employee",
        element: <Employee />,
      },
      {
        path: "/add-employee",
        element: <AddEmployee />,
      },
      {
        path: "/add-employee-excel",
        element: <AddEmployeeBulk />,
      },
      {
        path: "/detail-employee/:id",
        element: <DetailEmployee />,
      },
      {
        path: "/edit-employee/:id",
        element: <EditEmployee />,
      },
      {
        path: "/fee",
        element: <Fee />,
      },
      {
        path: "/detail-fee/",
        element: <DetailFee />,
      },
      {
        path: "/candidate",
        element: <Candidate />,
      },
      {
        path: "/users",
        element: <UserList />,
      },
      {
        path: "/add-user",
        element: <AddUser />,
      },
      {
        path: "/edit-user/:id",
        element: <EditUser />,
      },
      {
        path: "/role",
        element: <Role />,
      },
      {
        path: "/add-role",
        element: <AddRole />,
      },
      {
        path: "/edit-role/:id",
        element: <EditRole />,
      },
    ],
  },
  {
    path: "/create-password/:email",
    element: <CreatePassword />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      const tokenDashboard = localStorage.getItem("tokenDashboard");
      if (tokenDashboard) {
        throw redirect("/");
      }
      return null;
    },
  },
]);

export default router;
