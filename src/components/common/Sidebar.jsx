import React from "react";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  const dataLocal = JSON.parse(localStorage.privilege);

  const [isSettingSubMenuVisible, setSettingSubMenuVisible] = useState(false);

  const handleSettingClick = () => {
    setSettingSubMenuVisible(!isSettingSubMenuVisible);
  };
  return (
    <>
      <aside className="app-sidebar">
        <div className="app-sidebar__logo" style={{ background: "#2a2e3f" }}>
          <Link to="/" className="header-brand">
            <img src="/images/brand/logo.png" className="header-brand-img desktop-lgo" alt="ewa logo" />
            <img src="/images/brand/logo1.png" className="header-brand-img dark-logo" alt="ewa logo" />
            <img src="/images/brand/favicon.png" className="header-brand-img mobile-logo" alt="ewa logo" />
            <img src="/images/brand/favicon1.png" className="header-brand-img darkmobile-logo" alt="ewa logo" />
          </Link>
        </div>
        <ul className="side-menu app-sidebar3">
          <li className="slide" style={{ cursor: "pointer", display: dataLocal.dashboardView ? "" : "none" }}>
            <NavLink className="side-menu__item" to="/">
              <svg xmlns="http://www.w3.org/2000/svg" class="side-menu__icon" width="24" height="24" viewBox="0 0 24 24">
                <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"></path>
              </svg>
              <span className="side-menu__label" style={{ color: "#fff" }}>
                Dashboard
              </span>
            </NavLink>
          </li>
          <li className="slide" style={{ cursor: "pointer", display: dataLocal.employeeView ? "" : "none" }}>
            <NavLink className="side-menu__item" to="/employee">
              <svg xmlns="http://www.w3.org/2000/svg" class="side-menu__icon" width="24" height="24" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm0 2 .001 4H5V5h14zM5 11h8v8H5v-8zm10 8v-8h4.001l.001 8H15z"></path>
              </svg>
              <span className="side-menu__label" style={{ color: "#fff" }}>
                Employee
              </span>
            </NavLink>
          </li>
          <li className="slide" style={{ cursor: "pointer", display: dataLocal.feeView ? "" : "none" }}>
            <NavLink className="side-menu__item" to="/fee">
              <svg xmlns="http://www.w3.org/2000/svg" class="side-menu__icon" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 22c4.879 0 9-4.121 9-9s-4.121-9-9-9-9 4.121-9 9 4.121 9 9 9zm0-16c3.794 0 7 3.206 7 7s-3.206 7-7 7-7-3.206-7-7 3.206-7 7-7zm5.284-2.293 1.412-1.416 3.01 3-1.413 1.417zM5.282 2.294 6.7 3.706l-2.99 3-1.417-1.413z"></path>
                <path d="M11 9h2v5h-2zm0 6h2v2h-2z"></path>
              </svg>
              <span className="side-menu__label" style={{ color: "#fff" }}>
                Fee
              </span>
            </NavLink>
          </li>
          <li className="slide" style={{ cursor: "pointer", display: dataLocal.settingView ? "" : "none" }}>
            <div className="side-menu__item" onClick={handleSettingClick}>
              <svg xmlns="http://www.w3.org/2000/svg" class="side-menu__icon" width="24" height="24" viewBox="0 0 24 24">
                <path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 6h-4V5h4v4zm-9 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6H5v-4h4v4zm8-6c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"></path>
              </svg>
              <span className="side-menu__label" style={{ color: "#fff" }}>
                Setting
              </span>
            </div>
            {/* Submenu for User and Role */}
            {isSettingSubMenuVisible && (
              <ul className="submenu" style={{ listStyleType: "none", paddingLeft: "65px" }}>
                <li className="slide">
                  <NavLink className="side-menu__item" to="/users">
                    <span className="side-menu__label" style={{ color: "#fff" }}>
                      User List
                    </span>
                  </NavLink>
                </li>
                <li className="slide">
                  <NavLink className="side-menu__item" to="/role">
                    <span className="side-menu__label" style={{ color: "#fff" }}>
                      Role
                    </span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </aside>
      <Helmet>
        <script src="/plugins/p-scrollbar/p-scroll1.js" type="text/javascript"></script>
        <script src="/plugins/p-scrollbar/p-scroll.js" type="text/javascript"></script>
      </Helmet>
    </>
  );
}

// export default function Sidebar() {
//   return (
//     <>
//       <aside class="app-sidebar">
//         <div class="app-sidebar__logo">
//           <a class="header-brand" href="index.html">
//             <img src="/images/brand/logo.png" class="header-brand-img desktop-lgo" alt="Azea logo" />
//             <img src="/images/brand/logo1.png" class="header-brand-img dark-logo" alt="Azea logo" />
//             <img src="/images/brand/favicon.png" class="header-brand-img mobile-logo" alt="Azea logo" />
//             <img src="/images/brand/favicon1.png" class="header-brand-img darkmobile-logo" alt="Azea logo" />
//           </a>
//         </div>
//         <ul class="side-menu app-sidebar3">
//           <li class="slide">
//             <a class="side-menu__item" href="index.html">
//               <svg xmlns="http://www.w3.org/2000/svg" class="side-menu__icon" width="24" height="24" viewBox="0 0 24 24">
//                 <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z" />
//               </svg>
//               <span class="side-menu__label">Dashboard</span>
//             </a>
//           </li>
//           <li class="slide">
//             <a class="side-menu__item" href="index.html">
//               <svg xmlns="http://www.w3.org/2000/svg" class="side-menu__icon" width="24" height="24" viewBox="0 0 24 24">
//                 <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z" />
//               </svg>
//               <span class="side-menu__label">Employee</span>
//             </a>
//           </li>
//           <li class="slide">
//             <a class="side-menu__item" href="index.html">
//               <svg xmlns="http://www.w3.org/2000/svg" class="side-menu__icon" width="24" height="24" viewBox="0 0 24 24">
//                 <path d="M12 22c4.879 0 9-4.121 9-9s-4.121-9-9-9-9 4.121-9 9 4.121 9 9 9zm0-16c3.794 0 7 3.206 7 7s-3.206 7-7 7-7-3.206-7-7 3.206-7 7-7zm5.284-2.293 1.412-1.416 3.01 3-1.413 1.417zM5.282 2.294 6.7 3.706l-2.99 3-1.417-1.413z"></path>
//                 <path d="M11 9h2v5h-2zm0 6h2v2h-2z"></path>
//               </svg>
//               <span class="side-menu__label">Fee</span>
//             </a>
//           </li>
//           <li class="slide">
//             <Link class="side-menu__item">
//               <svg xmlns="http://www.w3.org/2000/svg" class="side-menu__icon" width="24" height="24" viewBox="0 0 24 24">
//                 <path d="M12 22c4.879 0 9-4.121 9-9s-4.121-9-9-9-9 4.121-9 9 4.121 9 9 9zm0-16c3.794 0 7 3.206 7 7s-3.206 7-7 7-7-3.206-7-7 3.206-7 7-7zm5.284-2.293 1.412-1.416 3.01 3-1.413 1.417zM5.282 2.294 6.7 3.706l-2.99 3-1.417-1.413z" />
//                 <path d="M11 9h2v5h-2zm0 6h2v2h-2z" />
//               </svg>
//               <span class="side-menu__label">Utilities</span>
//               <i class="angle fe fe-chevron-right"></i>
//             </Link>
//             <ul>
//               <li>
//                 <a href="elements-border.html" class="slide-item">
//                   {" "}
//                   User List
//                 </a>
//               </li>
//               <li>
//                 <a href="element-colors.html" class="slide-item">
//                   {" "}
//                   Role
//                 </a>
//               </li>
//             </ul>
//           </li>
//         </ul>
//       </aside>
//     </>
//   );
// }
