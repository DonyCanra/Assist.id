import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Loader from "./Loader";
import BackTop from "./BackTop";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Loader />

      <div className="page">
        <div className="page-main">
          <Sidebar />

          <div className="app-content main-content">
            <div className="side-app">
              <Navbar />

              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <BackTop />
    </>
  );
}
