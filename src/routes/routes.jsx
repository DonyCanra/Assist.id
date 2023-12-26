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
        loader: () => {
          const dataLocal = JSON.parse(localStorage.privilege);
          const isDashboard = dataLocal.dashboardView;
          if (!isDashboard) {
            localStorage.clear();
            throw redirect("/login");
          }

          return null;
        },
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
        loader: () => {
          const dataLocal = JSON.parse(localStorage.privilege);
          const isEmployee = dataLocal.employeeView;
          if (!isEmployee) {
            throw redirect("/");
          }
          return null;
        },
      },
      {
        path: "/add-employee",
        element: <AddEmployee />,
        loader: () => {
          const dataLocal = JSON.parse(localStorage.privilege);
          const isAddEmployee = dataLocal.employeeAdd;
          if (!isAddEmployee) {
            throw redirect("/");
          }
          return null;
        },
      },
      {
        path: "/add-employee-excel",
        element: <AddEmployeeBulk />,
        loader: () => {
          const dataLocal = JSON.parse(localStorage.privilege);
          const isAddEmployee = dataLocal.employeeAdd;
          if (!isAddEmployee) {
            throw redirect("/");
          }
          return null;
        },
      },
      {
        path: "/detail-employee/:id",
        element: <DetailEmployee />,
        loader: () => {
          const dataLocal = JSON.parse(localStorage.privilege);
          const isDetailEmployee = dataLocal.employeeDetail;
          if (!isDetailEmployee) {
            throw redirect("/");
          }
          return null;
        },
      },
      {
        path: "/edit-employee/:id",
        element: <EditEmployee />,
        loader: () => {
          const dataLocal = JSON.parse(localStorage.privilege);
          const isUpdateEmployee = dataLocal.employeeUpdate;
          if (!isUpdateEmployee) {
            throw redirect("/");
          }
          return null;
        },
      },
      {
        path: "/fee",
        element: <Fee />,
        loader: () => {
          const dataLocal = JSON.parse(localStorage.privilege);
          const isFee = dataLocal.feeView;
          if (!isFee) {
            throw redirect("/");
          }

          return null;
        },
      },
      {
        path: "/detail-fee/",
        element: <DetailFee />,
        loader: () => {
          const dataLocal = JSON.parse(localStorage.privilege);
          const isDetailFee = dataLocal.feeDetail;
          if (!isDetailFee) {
            throw redirect("/");
          }
          return null;
        },
      },
      {
        path: "/candidate",
        element: <Candidate />,
        loader: () => {
          const dataLocal = JSON.parse(localStorage.privilege);
          const isEmployee = dataLocal.employeeView;
          if (!isEmployee) {
            throw redirect("/");
          }
          return null;
        },
      },
      {
        path: "/users",
        element: <UserList />,
        loader: () => {
          const dataLocal = JSON.parse(localStorage.privilege);
          const isUsers = dataLocal.settingView;
          if (!isUsers) {
            throw redirect("/");
          }

          return null;
        },
      },
      {
        path: "/add-user",
        element: <AddUser />,
        loader: () => {
          const dataLocal = JSON.parse(localStorage.privilege);
          const isAddRole = dataLocal.userAdd;
          if (!isAddRole) {
            throw redirect("/");
          }

          return null;
        },
      },
      {
        path: "/edit-user/:id",
        element: <EditUser />,
        loader: () => {
          const dataLocal = JSON.parse(localStorage.privilege);
          const isUpdateUser = dataLocal.userUpdate;
          if (!isUpdateUser) {
            throw redirect("/");
          }

          return null;
        },
      },
      {
        path: "/role",
        element: <Role />,
        loader: () => {
          const dataLocal = JSON.parse(localStorage.privilege);
          const isRole = dataLocal.settingView;
          if (!isRole) {
            throw redirect("/");
          }

          return null;
        },
      },
      {
        path: "/add-role",
        element: <AddRole />,
        loader: () => {
          const dataLocal = JSON.parse(localStorage.privilege);
          const isAddRole = dataLocal.roleAdd;
          if (!isAddRole) {
            throw redirect("/");
          }

          return null;
        },
      },
      {
        path: "/edit-role/:id",
        element: <EditRole />,
        loader: () => {
          const dataLocal = JSON.parse(localStorage.privilege);
          const isUpdateRole = dataLocal.roleUpdate;
          if (!isUpdateRole) {
            throw redirect("/");
          }

          return null;
        },
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
