import { useState } from "react";

const CheckboxInput = ({ input, handleChange }) => {
  const [privilege, setPrivilege] = useState({
    dashboard: false,
    employee: false,
    fee: false,
    setting: false,
  });

  const handleSelectAllDashboard = () => {
    setPrivilege((prevPrivilege) => ({
      ...prevPrivilege,
      dashboard: !prevPrivilege.dashboard,
    }));

    if (!privilege.dashboard) {
      input.dashboardView = true;
    } else {
      input.dashboardView = false;
    }
  };

  const handleSelectAllEmployee = () => {
    setPrivilege((prevPrivilege) => ({
      ...prevPrivilege,
      employee: !prevPrivilege.employee,
    }));

    if (!privilege.employee) {
      input.employeeView = true;
      input.employeeAdd = true;
      input.employeeDetail = true;
      input.employeeDownload = true;
      input.employeeSearch = true;
      input.employeeUpdate = true;
      input.candidateApprove = true;
      input.candidateDownload = true;
    } else {
      input.employeeView = false;
      input.employeeAdd = false;
      input.employeeDetail = false;
      input.employeeDownload = false;
      input.employeeSearch = false;
      input.employeeUpdate = false;
      input.candidateApprove = false;
      input.candidateDownload = false;
    }
  };

  const handleSelectAllFee = () => {
    setPrivilege((prevPrivilege) => ({
      ...prevPrivilege,
      fee: !prevPrivilege.fee,
    }));

    if (!privilege.fee) {
      input.feeView = true;
      input.feeSearch = true;
      input.feeDetail = true;
      input.feeDownload = true;
    } else {
      input.feeView = false;
      input.feeSearch = false;
      input.feeDetail = false;
      input.feeDownload = false;
    }
  };

  const handleSelectAllSetting = () => {
    setPrivilege((prevPrivilege) => ({
      ...prevPrivilege,
      setting: !prevPrivilege.setting,
    }));
    if (!privilege.setting) {
      input.settingView = true;
      input.roleAdd = true;
      input.roleUpdate = true;
      input.userAdd = true;
      input.userUpdate = true;
    } else {
      input.settingView = false;
      input.roleAdd = false;
      input.roleUpdate = false;
      input.userAdd = false;
      input.userUpdate = false;
    }
  };

  const [isSubMenuDashboardVisible, setSubMenuDashboardVisible] = useState(false);
  const [isSubMenuEmployeeVisible, setSubMenuEmployeeVisible] = useState(false);
  const [isSubMenuFeeVisible, setSubMenuFeeVisible] = useState(false);
  const [isSubMenuSettingVisible, setSubMenuSettingVisible] = useState(false);

  const handleToggleSubMenuDashboard = () => {
    setSubMenuDashboardVisible(!isSubMenuDashboardVisible);
  };
  const handleToggleSubMenuEmployee = () => {
    setSubMenuEmployeeVisible(!isSubMenuEmployeeVisible);
  };
  const handleToggleSubMenuFee = () => {
    setSubMenuFeeVisible(!isSubMenuFeeVisible);
  };
  const handleToggleSubMenuSetting = () => {
    setSubMenuSettingVisible(!isSubMenuSettingVisible);
  };

  return (
    <>
      <div className="" style={{ background: "#373B51", borderRadius: "5px" }}>
        <div className="text-white" style={{ height: "23px", background: "#404356", borderRadius: "5px 5px 0px 0px", padding: "5px 8px" }}>
          <h6 style={{ background: "#404356", borderRadius: "5px 5px 0px 0px" }}>Feature</h6>
        </div>
        <div className="privileges" style={{ margin: "5px 5px", padding: "5px 5px" }}>
          {/* Privileges Dashboard */}
          <div className="dashboard-privileges" style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", marginBottom: "2px" }} onClick={handleToggleSubMenuDashboard}>
              {isSubMenuDashboardVisible ? (
                // SVG icon when submenu is visible
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
                  <path
                    d="M4.65967 7.0022L0.464996 2.69956C0.396131 2.62926 0.341833 2.54605 0.305222 2.45471C0.26861 2.36337 0.250406 2.2657 0.251656 2.1673C0.252907 2.0689 0.273586 1.97172 0.312507 1.88134C0.351428 1.79096 0.407822 1.70916 0.478451 1.64064L1.19337 0.943669C1.26366 0.874804 1.34686 0.820504 1.43821 0.783893C1.52955 0.747281 1.62723 0.729077 1.72562 0.730327C1.82402 0.731578 1.9212 0.752258 2.01158 0.791178C2.10196 0.830099 2.18376 0.886495 2.25228 0.957124L5.22577 4.00715L8.27581 1.03266C8.3461 0.963795 8.42931 0.909498 8.52065 0.872886C8.61199 0.836274 8.70967 0.81807 8.80806 0.819321C8.90646 0.820571 9.00364 0.841251 9.09402 0.880171C9.1844 0.919092 9.2662 0.975486 9.33472 1.04612L10.0378 1.75511C10.1066 1.8254 10.1609 1.90861 10.1975 1.99995C10.2342 2.09129 10.2524 2.18896 10.2511 2.28736C10.2499 2.38576 10.2292 2.48294 10.1903 2.57332C10.1513 2.6637 10.0949 2.7455 10.0243 2.81402L5.72168 7.00869C5.65171 7.07835 5.56865 7.13348 5.47729 7.17088C5.38592 7.20829 5.28805 7.22723 5.18932 7.22663C5.0906 7.22602 4.99296 7.20588 4.90206 7.16736C4.81115 7.12884 4.72877 7.07271 4.65967 7.0022Z"
                    fill="white"
                  />
                </svg>
              ) : (
                // SVG icon when submenu is not visible
                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none" style={{ verticalAlign: "middle" }}>
                  <g clipPath="url(#clip0_1_4369)">
                    <path
                      d="M6.23509 5.53109L1.98609 9.78009C1.91667 9.84984 1.83416 9.90519 1.74329 9.94296C1.65243 9.98073 1.55499 10.0002 1.45658 10.0002C1.35818 10.0002 1.26074 9.98073 1.16988 9.94296C1.07901 9.90519 0.996498 9.84984 0.927086 9.78009L0.221087 9.07409C0.151333 9.00468 0.0959815 8.92217 0.0582123 8.8313C0.020443 8.74043 0.000999451 8.64299 0.000999451 8.54459C0.000999451 8.44618 0.020443 8.34875 0.0582123 8.25788C0.0959815 8.16701 0.151333 8.0845 0.221087 8.01509L3.23309 5.00309L0.220085 1.99109C0.150332 1.92168 0.0949821 1.83917 0.0572128 1.7483C0.0194436 1.65743 0 1.55999 0 1.46159C0 1.36318 0.0194436 1.26575 0.0572128 1.17488C0.0949821 1.08401 0.150332 1.0015 0.220085 0.932091L0.920086 0.220085C0.989498 0.150332 1.07201 0.0949821 1.16288 0.0572128C1.25374 0.0194436 1.35118 0 1.44958 0C1.54799 0 1.64543 0.0194436 1.73629 0.0572128C1.82716 0.0949821 1.90967 0.150332 1.97909 0.220085L6.22809 4.46909C6.29863 4.53816 6.3548 4.62051 6.39337 4.7114C6.43193 4.80228 6.45212 4.8999 6.45277 4.99863C6.45342 5.09735 6.43452 5.19523 6.39716 5.28662C6.3598 5.37801 6.30471 5.4611 6.23509 5.53109Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_4369">
                      <rect width="6.455" height="10.001" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer", userSelect: "none" }}>
              <input
                name="dashboard"
                value={input.dashboardView ? (privilege.dashboard = true) : (privilege.dashboard = false)}
                type="checkbox"
                checked={privilege.dashboard}
                onChange={handleSelectAllDashboard}
                style={{ marginRight: "5px" }}
              />
              Dashboard
            </div>
          </div>
          {isSubMenuDashboardVisible && (
            <div className="submenu-privileges" style={{ marginLeft: "20px", display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: "5px", marginLeft: "10px", display: "flex", alignItems: "center" }}>
                <input name="dashboardView" value={privilege.dashboard} type="checkbox" checked={input.dashboardView} onChange={handleChange} style={{ marginRight: "5px" }} />
                <span style={{ marginLeft: "0px" }}>View Dashboard</span>
              </div>
            </div>
          )}

          {/* Privileges Employee */}
          <div className="employee-privileges" style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", marginBottom: "2px" }} onClick={handleToggleSubMenuEmployee}>
              {isSubMenuEmployeeVisible ? (
                // SVG icon when submenu is visible
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
                  <path
                    d="M4.65967 7.0022L0.464996 2.69956C0.396131 2.62926 0.341833 2.54605 0.305222 2.45471C0.26861 2.36337 0.250406 2.2657 0.251656 2.1673C0.252907 2.0689 0.273586 1.97172 0.312507 1.88134C0.351428 1.79096 0.407822 1.70916 0.478451 1.64064L1.19337 0.943669C1.26366 0.874804 1.34686 0.820504 1.43821 0.783893C1.52955 0.747281 1.62723 0.729077 1.72562 0.730327C1.82402 0.731578 1.9212 0.752258 2.01158 0.791178C2.10196 0.830099 2.18376 0.886495 2.25228 0.957124L5.22577 4.00715L8.27581 1.03266C8.3461 0.963795 8.42931 0.909498 8.52065 0.872886C8.61199 0.836274 8.70967 0.81807 8.80806 0.819321C8.90646 0.820571 9.00364 0.841251 9.09402 0.880171C9.1844 0.919092 9.2662 0.975486 9.33472 1.04612L10.0378 1.75511C10.1066 1.8254 10.1609 1.90861 10.1975 1.99995C10.2342 2.09129 10.2524 2.18896 10.2511 2.28736C10.2499 2.38576 10.2292 2.48294 10.1903 2.57332C10.1513 2.6637 10.0949 2.7455 10.0243 2.81402L5.72168 7.00869C5.65171 7.07835 5.56865 7.13348 5.47729 7.17088C5.38592 7.20829 5.28805 7.22723 5.18932 7.22663C5.0906 7.22602 4.99296 7.20588 4.90206 7.16736C4.81115 7.12884 4.72877 7.07271 4.65967 7.0022Z"
                    fill="white"
                  />
                </svg>
              ) : (
                // SVG icon when submenu is not visible
                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none" style={{ verticalAlign: "middle" }}>
                  <g clipPath="url(#clip0_1_4369)">
                    <path
                      d="M6.23509 5.53109L1.98609 9.78009C1.91667 9.84984 1.83416 9.90519 1.74329 9.94296C1.65243 9.98073 1.55499 10.0002 1.45658 10.0002C1.35818 10.0002 1.26074 9.98073 1.16988 9.94296C1.07901 9.90519 0.996498 9.84984 0.927086 9.78009L0.221087 9.07409C0.151333 9.00468 0.0959815 8.92217 0.0582123 8.8313C0.020443 8.74043 0.000999451 8.64299 0.000999451 8.54459C0.000999451 8.44618 0.020443 8.34875 0.0582123 8.25788C0.0959815 8.16701 0.151333 8.0845 0.221087 8.01509L3.23309 5.00309L0.220085 1.99109C0.150332 1.92168 0.0949821 1.83917 0.0572128 1.7483C0.0194436 1.65743 0 1.55999 0 1.46159C0 1.36318 0.0194436 1.26575 0.0572128 1.17488C0.0949821 1.08401 0.150332 1.0015 0.220085 0.932091L0.920086 0.220085C0.989498 0.150332 1.07201 0.0949821 1.16288 0.0572128C1.25374 0.0194436 1.35118 0 1.44958 0C1.54799 0 1.64543 0.0194436 1.73629 0.0572128C1.82716 0.0949821 1.90967 0.150332 1.97909 0.220085L6.22809 4.46909C6.29863 4.53816 6.3548 4.62051 6.39337 4.7114C6.43193 4.80228 6.45212 4.8999 6.45277 4.99863C6.45342 5.09735 6.43452 5.19523 6.39716 5.28662C6.3598 5.37801 6.30471 5.4611 6.23509 5.53109Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_4369">
                      <rect width="6.455" height="10.001" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer", userSelect: "none" }}>
              <input
                name="employee"
                value={
                  input.employeeView && input.employeeAdd && input.employeeDetail && input.employeeDownload && input.employeeSearch && input.employeeUpdate && input.candidateDownload && input.candidateApprove
                    ? (privilege.employee = true)
                    : (privilege.employee = false)
                }
                type="checkbox"
                checked={privilege.employee}
                onChange={handleSelectAllEmployee}
                style={{ marginRight: "5px" }}
              />
              Employee
            </div>
          </div>
          {isSubMenuEmployeeVisible && (
            <div className="submenu-privileges" style={{ marginLeft: "20px", display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: "5px", marginLeft: "10px", display: "flex", alignItems: "center" }}>
                <input name="employeeView" value={input.employeeView} type="checkbox" checked={input.employeeView} onChange={handleChange} style={{ marginRight: "5px" }} />
                <span style={{ marginLeft: "0px" }}>View Employee</span>
              </div>
              <div style={{ marginBottom: "5px", marginLeft: "10px", display: "flex", alignItems: "center" }}>
                <input name="employeeAdd" value={input.employeeAdd} type="checkbox" checked={input.employeeAdd} onChange={handleChange} style={{ marginRight: "5px" }} />
                <span style={{ marginLeft: "0px" }}>Add Employee</span>
              </div>
              <div style={{ marginBottom: "5px", marginLeft: "10px", display: "flex", alignItems: "center" }}>
                <input name="employeeUpdate" value={input.employeeUpdate} type="checkbox" checked={input.employeeUpdate} onChange={handleChange} style={{ marginRight: "5px" }} />
                <span style={{ marginLeft: "0px" }}>Update Employee</span>
              </div>
              <div style={{ marginBottom: "5px", marginLeft: "10px", display: "flex", alignItems: "center" }}>
                <input name="employeeDetail" value={input.employeeDetail} type="checkbox" checked={input.employeeDetail} onChange={handleChange} style={{ marginRight: "5px" }} />
                <span style={{ marginLeft: "0px" }}>Detail Employee</span>
              </div>
              <div style={{ marginBottom: "5px", marginLeft: "10px", display: "flex", alignItems: "center" }}>
                <input name="employeeDownload" value={input.employeeDownload} type="checkbox" checked={input.employeeDownload} onChange={handleChange} style={{ marginRight: "5px" }} />
                <span style={{ marginLeft: "0px" }}>Download Employee</span>
              </div>
              <div style={{ marginBottom: "5px", marginLeft: "10px", display: "flex", alignItems: "center" }}>
                <input name="employeeSearch" value={input.employeeSearch} type="checkbox" checked={input.employeeSearch} onChange={handleChange} style={{ marginRight: "5px" }} />
                <span style={{ marginLeft: "0px" }}>Search Employee</span>
              </div>
              <div style={{ marginBottom: "5px", marginLeft: "10px", display: "flex", alignItems: "center" }}>
                <input name="candidateApprove" value={input.candidateApprove} type="checkbox" checked={input.candidateApprove} onChange={handleChange} style={{ marginRight: "5px" }} />
                <span style={{ marginLeft: "0px" }}>Approve Candidate</span>
              </div>
              <div style={{ marginBottom: "5px", marginLeft: "10px", display: "flex", alignItems: "center" }}>
                <input name="candidateDownload" value={input.candidateDownload} type="checkbox" checked={input.candidateDownload} onChange={handleChange} style={{ marginRight: "5px" }} />
                <span style={{ marginLeft: "0px" }}>Download Candidate</span>
              </div>
            </div>
          )}

          {/* Privileges Fee */}
          <div className="fee-privileges" style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", marginBottom: "2px" }} onClick={handleToggleSubMenuFee}>
              {isSubMenuFeeVisible ? (
                // SVG icon when submenu is visible
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
                  <path
                    d="M4.65967 7.0022L0.464996 2.69956C0.396131 2.62926 0.341833 2.54605 0.305222 2.45471C0.26861 2.36337 0.250406 2.2657 0.251656 2.1673C0.252907 2.0689 0.273586 1.97172 0.312507 1.88134C0.351428 1.79096 0.407822 1.70916 0.478451 1.64064L1.19337 0.943669C1.26366 0.874804 1.34686 0.820504 1.43821 0.783893C1.52955 0.747281 1.62723 0.729077 1.72562 0.730327C1.82402 0.731578 1.9212 0.752258 2.01158 0.791178C2.10196 0.830099 2.18376 0.886495 2.25228 0.957124L5.22577 4.00715L8.27581 1.03266C8.3461 0.963795 8.42931 0.909498 8.52065 0.872886C8.61199 0.836274 8.70967 0.81807 8.80806 0.819321C8.90646 0.820571 9.00364 0.841251 9.09402 0.880171C9.1844 0.919092 9.2662 0.975486 9.33472 1.04612L10.0378 1.75511C10.1066 1.8254 10.1609 1.90861 10.1975 1.99995C10.2342 2.09129 10.2524 2.18896 10.2511 2.28736C10.2499 2.38576 10.2292 2.48294 10.1903 2.57332C10.1513 2.6637 10.0949 2.7455 10.0243 2.81402L5.72168 7.00869C5.65171 7.07835 5.56865 7.13348 5.47729 7.17088C5.38592 7.20829 5.28805 7.22723 5.18932 7.22663C5.0906 7.22602 4.99296 7.20588 4.90206 7.16736C4.81115 7.12884 4.72877 7.07271 4.65967 7.0022Z"
                    fill="white"
                  />
                </svg>
              ) : (
                // SVG icon when submenu is not visible
                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none" style={{ verticalAlign: "middle" }}>
                  <g clipPath="url(#clip0_1_4369)">
                    <path
                      d="M6.23509 5.53109L1.98609 9.78009C1.91667 9.84984 1.83416 9.90519 1.74329 9.94296C1.65243 9.98073 1.55499 10.0002 1.45658 10.0002C1.35818 10.0002 1.26074 9.98073 1.16988 9.94296C1.07901 9.90519 0.996498 9.84984 0.927086 9.78009L0.221087 9.07409C0.151333 9.00468 0.0959815 8.92217 0.0582123 8.8313C0.020443 8.74043 0.000999451 8.64299 0.000999451 8.54459C0.000999451 8.44618 0.020443 8.34875 0.0582123 8.25788C0.0959815 8.16701 0.151333 8.0845 0.221087 8.01509L3.23309 5.00309L0.220085 1.99109C0.150332 1.92168 0.0949821 1.83917 0.0572128 1.7483C0.0194436 1.65743 0 1.55999 0 1.46159C0 1.36318 0.0194436 1.26575 0.0572128 1.17488C0.0949821 1.08401 0.150332 1.0015 0.220085 0.932091L0.920086 0.220085C0.989498 0.150332 1.07201 0.0949821 1.16288 0.0572128C1.25374 0.0194436 1.35118 0 1.44958 0C1.54799 0 1.64543 0.0194436 1.73629 0.0572128C1.82716 0.0949821 1.90967 0.150332 1.97909 0.220085L6.22809 4.46909C6.29863 4.53816 6.3548 4.62051 6.39337 4.7114C6.43193 4.80228 6.45212 4.8999 6.45277 4.99863C6.45342 5.09735 6.43452 5.19523 6.39716 5.28662C6.3598 5.37801 6.30471 5.4611 6.23509 5.53109Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_4369">
                      <rect width="6.455" height="10.001" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer", userSelect: "none" }}>
              <input
                name="fee"
                value={input.feeView && input.feeDetail && input.feeDownload && input.feeSearch ? (privilege.fee = true) : (privilege.fee = false)}
                type="checkbox"
                checked={privilege.fee}
                onChange={handleSelectAllFee}
                style={{ marginRight: "5px" }}
              />
              Fee
            </div>
          </div>
          {isSubMenuFeeVisible && (
            <div className="submenu-privileges" style={{ marginLeft: "20px", display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: "5px", marginLeft: "10px", display: "flex", alignItems: "center" }}>
                <input name="feeView" value={input.feeView} type="checkbox" checked={input.feeView} onChange={handleChange} style={{ marginRight: "5px" }} />
                <span style={{ marginLeft: "0px" }}>View Fee</span>
              </div>
              <div style={{ marginBottom: "5px", marginLeft: "10px", display: "flex", alignItems: "center" }}>
                <input name="feeDetail" value={input.feeDetail} type="checkbox" checked={input.feeDetail} onChange={handleChange} style={{ marginRight: "5px" }} />
                <span style={{ marginLeft: "0px" }}>Detail Fee</span>
              </div>
              <div style={{ marginBottom: "5px", marginLeft: "10px", display: "flex", alignItems: "center" }}>
                <input name="feeSearch" value={input.feeSearch} type="checkbox" checked={input.feeSearch} onChange={handleChange} style={{ marginRight: "5px" }} />
                <span style={{ marginLeft: "0px" }}>Search Fee</span>
              </div>
              <div style={{ marginBottom: "5px", marginLeft: "10px", display: "flex", alignItems: "center" }}>
                <input name="feeDownload" value={input.feeDownload} type="checkbox" checked={input.feeDownload} onChange={handleChange} style={{ marginRight: "5px" }} />
                <span style={{ marginLeft: "0px" }}>Download Fee</span>
              </div>
            </div>
          )}

          {/* Privileges Setting */}
          <div className="setting-privileges" style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", marginBottom: "2px" }} onClick={handleToggleSubMenuSetting}>
              {isSubMenuSettingVisible ? (
                // SVG icon when submenu is visible
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
                  <path
                    d="M4.65967 7.0022L0.464996 2.69956C0.396131 2.62926 0.341833 2.54605 0.305222 2.45471C0.26861 2.36337 0.250406 2.2657 0.251656 2.1673C0.252907 2.0689 0.273586 1.97172 0.312507 1.88134C0.351428 1.79096 0.407822 1.70916 0.478451 1.64064L1.19337 0.943669C1.26366 0.874804 1.34686 0.820504 1.43821 0.783893C1.52955 0.747281 1.62723 0.729077 1.72562 0.730327C1.82402 0.731578 1.9212 0.752258 2.01158 0.791178C2.10196 0.830099 2.18376 0.886495 2.25228 0.957124L5.22577 4.00715L8.27581 1.03266C8.3461 0.963795 8.42931 0.909498 8.52065 0.872886C8.61199 0.836274 8.70967 0.81807 8.80806 0.819321C8.90646 0.820571 9.00364 0.841251 9.09402 0.880171C9.1844 0.919092 9.2662 0.975486 9.33472 1.04612L10.0378 1.75511C10.1066 1.8254 10.1609 1.90861 10.1975 1.99995C10.2342 2.09129 10.2524 2.18896 10.2511 2.28736C10.2499 2.38576 10.2292 2.48294 10.1903 2.57332C10.1513 2.6637 10.0949 2.7455 10.0243 2.81402L5.72168 7.00869C5.65171 7.07835 5.56865 7.13348 5.47729 7.17088C5.38592 7.20829 5.28805 7.22723 5.18932 7.22663C5.0906 7.22602 4.99296 7.20588 4.90206 7.16736C4.81115 7.12884 4.72877 7.07271 4.65967 7.0022Z"
                    fill="white"
                  />
                </svg>
              ) : (
                // SVG icon when submenu is not visible
                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none" style={{ verticalAlign: "middle" }}>
                  <g clipPath="url(#clip0_1_4369)">
                    <path
                      d="M6.23509 5.53109L1.98609 9.78009C1.91667 9.84984 1.83416 9.90519 1.74329 9.94296C1.65243 9.98073 1.55499 10.0002 1.45658 10.0002C1.35818 10.0002 1.26074 9.98073 1.16988 9.94296C1.07901 9.90519 0.996498 9.84984 0.927086 9.78009L0.221087 9.07409C0.151333 9.00468 0.0959815 8.92217 0.0582123 8.8313C0.020443 8.74043 0.000999451 8.64299 0.000999451 8.54459C0.000999451 8.44618 0.020443 8.34875 0.0582123 8.25788C0.0959815 8.16701 0.151333 8.0845 0.221087 8.01509L3.23309 5.00309L0.220085 1.99109C0.150332 1.92168 0.0949821 1.83917 0.0572128 1.7483C0.0194436 1.65743 0 1.55999 0 1.46159C0 1.36318 0.0194436 1.26575 0.0572128 1.17488C0.0949821 1.08401 0.150332 1.0015 0.220085 0.932091L0.920086 0.220085C0.989498 0.150332 1.07201 0.0949821 1.16288 0.0572128C1.25374 0.0194436 1.35118 0 1.44958 0C1.54799 0 1.64543 0.0194436 1.73629 0.0572128C1.82716 0.0949821 1.90967 0.150332 1.97909 0.220085L6.22809 4.46909C6.29863 4.53816 6.3548 4.62051 6.39337 4.7114C6.43193 4.80228 6.45212 4.8999 6.45277 4.99863C6.45342 5.09735 6.43452 5.19523 6.39716 5.28662C6.3598 5.37801 6.30471 5.4611 6.23509 5.53109Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_4369">
                      <rect width="6.455" height="10.001" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer", userSelect: "none" }}>
              <input
                name="setting"
                value={input.settingView && input.roleAdd && input.roleUpdate && input.userAdd && input.userUpdate ? (privilege.setting = true) : (privilege.setting = false)}
                type="checkbox"
                checked={privilege.setting}
                onChange={handleSelectAllSetting}
                style={{ marginRight: "5px" }}
              />
              Setting
            </div>
          </div>
          {isSubMenuSettingVisible && (
            <div className="submenu-privileges" style={{ marginLeft: "20px", display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: "5px", marginLeft: "10px", display: "flex", alignItems: "center" }}>
                <input name="settingView" value={input.settingView} type="checkbox" checked={input.settingView} onChange={handleChange} style={{ marginRight: "5px" }} />
                <span style={{ marginLeft: "0px" }}>View Setting</span>
              </div>
              <div style={{ marginBottom: "5px", marginLeft: "10px", display: "flex", alignItems: "center" }}>
                <input name="userAdd" value={input.userAdd} type="checkbox" checked={input.userAdd} onChange={handleChange} style={{ marginRight: "5px" }} />
                <span style={{ marginLeft: "0px" }}>Add User</span>
              </div>
              <div style={{ marginBottom: "5px", marginLeft: "10px", display: "flex", alignItems: "center" }}>
                <input name="userUpdate" value={input.userUpdate} type="checkbox" checked={input.userUpdate} onChange={handleChange} style={{ marginRight: "5px" }} />
                <span style={{ marginLeft: "0px" }}>Update User</span>
              </div>
              <div style={{ marginBottom: "5px", marginLeft: "10px", display: "flex", alignItems: "center" }}>
                <input name="roleAdd" value={input.roleAdd} type="checkbox" checked={input.roleAdd} onChange={handleChange} style={{ marginRight: "5px" }} />
                <span style={{ marginLeft: "0px" }}>Add Role</span>
              </div>
              <div style={{ marginBottom: "5px", marginLeft: "10px", display: "flex", alignItems: "center" }}>
                <input name="roleUpdate" value={input.roleUpdate} type="checkbox" checked={input.roleUpdate} onChange={handleChange} style={{ marginRight: "5px" }} />
                <span style={{ marginLeft: "0px" }}>Update Role</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckboxInput;
