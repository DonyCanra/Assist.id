import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDetailRole, updateRole } from "../../../../store/actions/thunks";
import CheckboxInput from "./Checkbox";

export default function EditRole() {
  const { role } = useSelector((state) => {
    return state.role;
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    id: id,
    roleName: "",
    dashboardView: false,
    employeeView: false,
    employeeDetail: false,
    employeeAdd: false,
    employeeUpdate: false,
    employeeDownload: false,
    employeeSearch: false,
    candidateApprove: false,
    candidateDownload: false,
    feeView: false,
    feeDetail: false,
    feeSearch: false,
    feeDownload: false,
    settingView: false,
    userDetail: false,
    userAdd: false,
    userUpdate: false,
    roleDetail: false,
    roleAdd: false,
    roleUpdate: false,
    status: true,
  });

  const [errorMessages, setErrorMessages] = useState({
    roleName: "",
    rolePrivilege: "",
  });

  useEffect(() => {
    if (role) {
      setInput({
        id: role.id,
        roleName: role.roleName,
        dashboardView: role.dashboardView,
        employeeView: role.employeeView,
        employeeDetail: role.employeeDetail,
        employeeAdd: role.employeeAdd,
        employeeUpdate: role.employeeUpdate,
        employeeDownload: role.employeeDownload,
        employeeSearch: role.employeeSearch,
        candidateApprove: role.candidateApprove,
        candidateDownload: role.candidateDownload,
        feeView: role.feeView,
        feeDetail: role.feeDetail,
        feeSearch: role.feeSearch,
        feeDownload: role.feeDownload,
        settingView: role.settingView,
        userDetail: role.userDetail,
        userAdd: role.userAdd,
        userUpdate: role.userUpdate,
        roleDetail: role.roleDetail,
        roleAdd: role.roleAdd,
        roleUpdate: role.roleUpdate,
        status: role.status,
      });
    }
  }, [role]);

  useEffect(() => {
    dispatch(fetchDetailRole(id));
  }, [dispatch, id]);

  const handleChange = (event) => {
    const { value, name, type, checked } = event.target;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error message on change
    }));
  };

  const handleCancel = () => {
    navigate("/role");
  };

  const handleUpdateRole = async (event) => {
    event.preventDefault();

    const validationErrors = validateInput(input);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessages(validationErrors);
      return;
    }

    try {
      await dispatch(updateRole(input));
      navigate("/role");
    } catch (error) {
      console.error("Error updated role:", error);
    }
  };

  const validateInput = (data) => {
    const errors = {};

    if (!data.roleName.trim()) {
      errors.roleName = "Role Name is required";
    }

    const privileges = [
      "dashboardView",
      "employeeView",
      "employeeDetail",
      "employeeAdd",
      "employeeUpdate",
      "employeeDownload",
      "employeeSearch",
      "candidateApprove",
      "candidateDownload",
      "feeView",
      "feeDetail",
      "feeSearch",
      "feeDownload",
      "settingView",
      "userDetail",
      "userAdd",
      "userUpdate",
      "roleDetail",
      "roleAdd",
      "roleUpdate",
    ];

    const hasPrivilege = privileges.some((privilege) => data[privilege]);

    if (!hasPrivilege) {
      errors.rolePrivilege = "At least one Role Privilege must be selected";
    }

    return errors;
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="card" style={{ background: "#212332" }}>
            <div className="page-header" style={{ margin: "20px 20px 20px 20px" }}>
              <div className="page-leftheader">
                <h4 className="page-title mb-0 text-primary">Edit Role</h4>
              </div>
            </div>

            <div
              className="card-body"
              style={{
                margin: "20px 20px 20px 20px",
                background: "#2B2E3F",
                borderRadius: "5px",
              }}
            >
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Role Name <span className="text-red">*</span>
                  </label>
                  <input type="text" className={`form-control ${errorMessages.roleName ? "border-danger" : ""}`} value={input.roleName} onChange={handleChange} name="roleName" placeholder="Input role name" />
                  <p className="text-danger">{errorMessages.roleName}</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Role Privilege <span className="text-red">*</span>
                  </label>
                  <p className="text-danger">{errorMessages.rolePrivilege}</p>
                  <CheckboxInput input={input} handleChange={handleChange} />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <div className="form-group">
                    <label className="custom-switch">
                      <input checked={input.status} onChange={handleChange} name="status" className="custom-switch-input" type="checkbox" />
                      <span className="custom-switch-indicator custom-switch-indicator-lg"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="page-header">
                  <div className="page-leftheader">
                    <button onClick={handleCancel} className="btn btn-danger page-leftheader">
                      Cancel
                    </button>
                  </div>
                  <div className="page-rightheader">
                    <button onClick={handleUpdateRole} className="btn btn-primary ms-1 page-rightheader" type="submit">
                      Submit
                    </button>
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
