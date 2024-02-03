import React from "react";
// import { Helmet } from "react-helmet";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <aside className="app-sidebar">
        <div className="app-sidebar__logo" style={{ background: "#2a2e3f" }}>
          <Link to="/" className="header-brand">
            <img src="/images/brand/assist.png" className="header-brand-img desktop-lgo" alt="ewa logo" />
            <img src="/images/brand/assist.png" className="header-brand-img dark-logo" alt="ewa logo" />
            <img src="/images/brand/assist.png" className="header-brand-img mobile-logo" alt="ewa logo" />
            <img src="/images/brand/assist.png" className="header-brand-img darkmobile-logo" alt="ewa logo" />
          </Link>
        </div>
        <ul className="side-menu app-sidebar3">
          <li className="slide">
            <NavLink className="side-menu__item" to="/">
              <svg xmlns="http://www.w3.org/2000/svg" class="side-menu__icon" width="24" height="24" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm0 2 .001 4H5V5h14zM5 11h8v8H5v-8zm10 8v-8h4.001l.001 8H15z"></path>
              </svg>
              <span className="side-menu__label" style={{ color: "#fff" }}>
                Employee
              </span>
            </NavLink>
          </li>
        </ul>
      </aside>
      {/* <Helmet>
        <script src="/plugins/p-scrollbar/p-scroll1.js" type="text/javascript"></script>
        <script src="/plugins/p-scrollbar/p-scroll.js" type="text/javascript"></script>
      </Helmet> */}
    </>
  );
}
