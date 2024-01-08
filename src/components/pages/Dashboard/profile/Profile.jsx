import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLogactivity, fetchPrivilege, fetchProfile } from "../../../../store/actions/thunks";
import { Link, useNavigate } from "react-router-dom";
import Row from "./LogactivityTableRaw";
import { images } from "../../../constants/data";

export default function Profile() {
  const { profile } = useSelector((state) => {
    return state.profile;
  });

  const avatarDefault = images[0].avatarDefault;

  const { logactivity } = useSelector((state) => {
    return state.logactivity;
  });

  const { privilege } = useSelector((state) => {
    return state.privilege;
  });

  const dataTable = logactivity.data;

  const [input] = useState({
    page: 1,
    limit: 10,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditClick = () => {
    // Pindah ke halaman edit dengan parameter id
    navigate(`/edit-profile/${profile.id}`);
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPrivilege());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchLogactivity(input));
  }, [dispatch, input]);

  return (
    <>
      <div className="page-header">
        <div className="page-leftheader">
          <h4 className="page-title mb-0 text-primary">Profile</h4>
        </div>
        <div className="page-rightheader">
          <div className="btn-list">
            <a
              onClick={(event) => {
                event.preventDefault();
                handleEditClick();
              }}
              className="btn btn-warning"
              href="/"
            >
              {/* <button className="btn btn-secondary"> */}
              <i className="fe fe-edit me-2"></i> Edit
              {/* </button> */}
            </a>
            <Link className="btn btn-secondary" to="/change-password">
              {/* <button className="btn btn-primary"> */}
              <i className="fe fe-lock me-2 fs-14"></i> Change Password
              {/* </button> */}
            </Link>
          </div>
        </div>
      </div>

      <div className="row text-white">
        <div className="col-xl-6 col-lg-6 col-md-12">
          <div className="card-header" style={{ background: "#2B2E3F" }}>
            <h3 className="card-title">Personal Information</h3>
          </div>
          <div className="card box-widget widget-user" style={{ height: "389px" }}>
            <div className="widget-user-image1 d-xl-flex mx-auto mt-5 d-block">
              <img style={{ width: "77px", height: "77px" }} alt="User Avatar" className="avatar brround p-0" src={profile.avatar === "" ? avatarDefault : profile.avatar} />
            </div>
            <div className="card-body text-left text-white">
              <div className="" style={{ margin: "50px 10px 10px 10px" }}>
                <tr style={{ height: "30px" }}>
                  <th scope="row">Name</th>
                  <td className="text-center w-8"> : </td>
                  <td> {profile.name}</td>
                </tr>
                <tr style={{ height: "30px" }} className="border-bottom">
                  <th scope="row">Phone Number</th>
                  <td className="text-center w-8"> : </td>
                  <td> {profile.phoneNumber}</td>
                </tr>
                <tr style={{ height: "30px" }} className="border-bottom">
                  <th scope="row">Email</th>
                  <td className="text-center w-8"> : </td>
                  <td> {profile.email}</td>
                </tr>
                <tr style={{ height: "30px" }} className="border-bottom">
                  <th scope="row">Role</th>
                  <td className="text-center w-8"> : </td>
                  <td> {profile.role}</td>
                </tr>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12">
          <div className="main-content-body main-content-body-profile card">
            <div className="card-header">
              <h3 className="card-title">PERMISSION</h3>
            </div>
            <div className="main-profile-body">
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="form-group m-0">
                      <div className="form-label mb-4">Dashboard</div>
                      <div className="custom-controls-stacked">
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" checked={privilege.dashboardView} />
                          <span className="custom-control-label">View dashboard</span>
                        </label>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox2" value="option2" checked={privilege.dashboardView} />
                          <span className="custom-control-label">Search by date on graphic</span>
                        </label>
                      </div>
                      <div className="form-label mb-4">EMPLOYEE</div>
                      <div className="custom-controls-stacked">
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" checked={privilege.employeeView} />
                          <span className="custom-control-label">View employee</span>
                        </label>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" checked={privilege.employeeAdd} />
                          <span className="custom-control-label">Create employee</span>
                        </label>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox2" value="option2" checked={privilege.employeeUpdate} />
                          <span className="custom-control-label">Update employee</span>
                        </label>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox2" value="option2" checked={privilege.employeeDownload} />
                          <span className="custom-control-label">Download employee</span>
                        </label>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox2" value="option2" checked={privilege.employeeDetail} />
                          <span className="custom-control-label">Detail employee</span>
                        </label>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox2" value="option3" checked={privilege.employeeSearch} />
                          <span className="custom-control-label">Search employee</span>
                        </label>
                      </div>
                      <div className="form-label mb-4">CANDIDATE</div>
                      <div className="custom-controls-stacked">
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" checked={privilege.candidateApprove} />
                          <span className="custom-control-label">Approve candidate</span>
                        </label>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" checked={privilege.candidateDownload} />
                          <span className="custom-control-label">Download candidate</span>
                        </label>
                      </div>
                      <div className="form-label mb-4">FEE</div>
                      <div className="custom-controls-stacked">
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" checked={privilege.feeView} />
                          <span className="custom-control-label">View fee</span>
                        </label>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" checked={privilege.feeDetail} />
                          <span className="custom-control-label">Detail fee</span>
                        </label>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox2" value="option2" checked={privilege.feeDownload} />
                          <span className="custom-control-label">Download fee</span>
                        </label>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox2" value="option3" checked={privilege.feeSearch} />
                          <span className="custom-control-label">Search fee</span>
                        </label>
                      </div>
                      <div className="form-label mb-4">SETTING</div>
                      <div className="custom-controls-stacked">
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" checked={privilege.settingView} />
                          <span className="custom-control-label">Setting View</span>
                        </label>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" checked={privilege.roleAdd} />
                          <span className="custom-control-label">Create role</span>
                        </label>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option2" checked={privilege.roleUpdate} />
                          <span className="custom-control-label">Update role</span>
                        </label>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option3" checked={privilege.userAdd} />
                          <span className="custom-control-label">Create user</span>
                        </label>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option3" checked={privilege.userUpdate} />
                          <span className="custom-control-label">Update user</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">LOG ACTIVITY</h3>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered card-table table-vcenter text-nowrap">
                <thead>
                  <tr className="border-top">
                    <th>ID</th>
                    <th>Module</th>
                    <th>Description</th>
                    <th>Create</th>
                  </tr>
                </thead>
                <tbody style={{ color: "#fff" }}>
                  {dataTable?.map((logactivity, index) => {
                    return <Row key={index} logactivity={logactivity} index={index} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
