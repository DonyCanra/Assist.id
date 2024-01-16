import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchPrivilege, fetchProfile } from "../../store/actions/thunks";
import { images } from "../../constants/data";

export default function Navbar() {
  const { profile } = useSelector((state) => {
    return state.profile;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const avatarDefault = images[0].avatarDefault;

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    // Initial fetch
    dispatch(fetchPrivilege());

    // Set up an interval to fetch data every 1 minute
    const intervalId = setInterval(() => {
      dispatch(fetchPrivilege());
    }, 60000); // 60000 milliseconds = 1 minute

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="app-header header main-header1">
        <div className="container-fluid">
          <div className="d-flex">
            <a className="header-brand" href="index.html">
              <img src="/images/brand/logo.png" className="header-brand-img desktop-lgo" alt="Ewa logo" />
              <img src="/images/brand/logo1.png" className="header-brand-img dark-logo" alt="Ewa logo" />
              <img src="/images/brand/favicon.png" className="header-brand-img mobile-logo" alt="Ewa logo" />
              <img src="/images/brand/favicon1.png" className="header-brand-img darkmobile-logo" alt="Ewa logo" />
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
                          <img src={profile.avatar === "" ? avatarDefault : profile.avatar} alt="img" className="avatar avatar-md brround" />
                        </span>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow animated">
                        <div className="text-center">
                          <div className="text-center user pb-0 font-weight-bold" style={{ textTransform: "none" }}>
                            {profile.name}
                          </div>
                          <span className="text-center user-semi-title">{profile.role}</span>
                          <div className="dropdown-divider"></div>
                        </div>
                        <Link to="/profile">
                          <button className="dropdown-item d-flex text-white">
                            <svg className="header-icon me-2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                              <path d="M0 0h24v24H0V0z" fill="none" />
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" />
                            </svg>
                            <div className="fs-13">Profile</div>
                          </button>
                        </Link>
                        <Link to="/change-password">
                          <button className="dropdown-item d-flex text-white">
                            <svg className="header-icon me-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                              <path d="M0 0h24v24H0V0z" fill="none" />
                              <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                            </svg>
                            <div className="fs-13">Change Password</div>
                          </button>
                        </Link>

                        <button onClick={logout} className="dropdown-item d-flex text-white">
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
