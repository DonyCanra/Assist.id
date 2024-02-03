import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../constants/data";

export default function Navbar() {
  const avatarDefault = images[0].avatarDefault;

  return (
    <>
      <div className="app-header header main-header1">
        <div className="container-fluid">
          <div className="d-flex">
            <a className="header-brand" href="index.html" style={{ backgroundColor: "#fff"}}>
              <img src="/images/brand/assist.png" className="header-brand-img desktop-lgo" alt="Ewa logo" />
              <img src="/images/brand/assist.png" className="header-brand-img dark-logo" alt="Ewa logo" />
              <img src="/images/brand/assist.png" className="header-brand-img mobile-logo" alt="Ewa logo" />
              <img src="/images/brand/assist.png" className="header-brand-img darkmobile-logo" alt="Ewa logo" />
            </a>
            <div className="app-sidebar__toggle d-flex" data-bs-toggle="sidebar">
              <Link className="open-toggle">
                <svg xmlns="http://www.w3.org/2000/svg" className="feather feather-align-left header-icon" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                </svg>
              </Link>
            </div>
            <div className="d-flex order-lg-2 ms-auto main-header-end">
              <div className="navbar navbar-expand-lg navbar-collapse responsive-navbar p-0">
                <div className="collapse navbar-collapse" id="navbarSupportedContent-4">
                  <div className="d-flex order-lg-2">
                    <div className="dropdown profile-dropdown d-flex">
                      <a href="/" className="nav-link pe-0 leading-none" data-bs-toggle="dropdown">
                        <span className="header-avatar1">
                          <img src={avatarDefault} alt="img" className="avatar avatar-md brround" />
                        </span>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow animated">
                        <div className="text-center">
                          <div className="text-center user pb-0 font-weight-bold" style={{ textTransform: "none" }}>
                            Dony Canra
                          </div>
                          <span className="text-center user-semi-title">Frontend Developer</span>
                          <div className="dropdown-divider"></div>
                        </div>
                        <button className="dropdown-item d-flex text-white">
                          <svg className="header-icon me-2" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24">
                            <g>
                              <rect fill="none" height="24" width="24" />
                            </g>
                            <g>
                              <path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z" />
                            </g>
                          </svg>
                          <div className="fs-13">Sign Out</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
