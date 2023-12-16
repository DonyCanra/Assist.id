import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../../../../store/actions/thunks";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const { profile } = useSelector((state) => {
    return state.profile;
  });
  // console.log(profile, "profile");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditClick = () => {
    // Pindah ke halaman edit dengan parameter id
    navigate(`/edit-profile/${profile.id}`);
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

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

      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-12">
          <div className="card-header" style={{ background: "#2B2E3F" }}>
            <h3 className="card-title">Personal Information</h3>
          </div>
          <div className="card box-widget widget-user">
            <div className="widget-user-image1 d-xl-flex mx-auto mt-5 d-block">
              <img alt="User Avatar" className="avatar brround p-0" src="https://media.suara.com/pictures/653x366/2022/06/21/37726-megawati.jpg" />
            </div>
            <div className="card-body text-left">
              <div className="" style={{ margin: "20px 10px" }}>
                <tr>
                  <th scope="row">Name</th>
                  <td className="text-center w-8"> : </td>
                  <td> {profile.name}</td>
                </tr>
                <tr className="border-bottom">
                  <th scope="row">Phone Number</th>
                  <td className="text-center w-8"> : </td>
                  <td> {profile.phoneNumber}</td>
                </tr>
                <tr className="border-bottom">
                  <th scope="row">Email</th>
                  <td className="text-center w-8"> : </td>
                  <td> {profile.email}</td>
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
                          <input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" checked="true" />
                          <span className="custom-control-label">View dashboard</span>
                        </label>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox2" value="option2" checked="true" />
                          <span className="custom-control-label">Search by date on grafic</span>
                        </label>
                      </div>
                      <div className="form-label mb-4">EMPLOYEE</div>
                      <div className="custom-controls-stacked">
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" checked="true" />
                          <span className="custom-control-label">Create employee</span>
                        </label>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox2" value="option2" checked="true" />
                          <span className="custom-control-label">Download employee</span>
                        </label>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox2" value="option3" checked="true" />
                          <span className="custom-control-label">Seach employee</span>
                        </label>
                      </div>
                      <div className="form-label mb-4">Role</div>
                      <div className="custom-controls-stacked">
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" checked="true" />
                          <span className="custom-control-label">Create role</span>
                        </label>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option2" checked="true" />
                          <span className="custom-control-label">Delete role</span>
                        </label>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option3" checked="true" />
                          <span className="custom-control-label">Update role</span>
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
                  <tr className="border-bottom">
                    <th scope="row">1</th>
                    <td>Login</td>
                    <td>John Doe has login</td>
                    <td>10 Aug 2023 at 18:31</td>
                  </tr>
                  <tr className="border-bottom">
                    <th scope="row">1</th>
                    <td>Login</td>
                    <td>John Doe has login</td>
                    <td>10 Aug 2023 at 18:31</td>
                  </tr>
                  <tr className="border-bottom">
                    <th scope="row">1</th>
                    <td>Login</td>
                    <td>John Doe has login</td>
                    <td>10 Aug 2023 at 18:31</td>
                  </tr>
                  <tr className="border-bottom">
                    <th scope="row">1</th>
                    <td>Login</td>
                    <td>John Doe has login</td>
                    <td>10 Aug 2023 at 18:31</td>
                  </tr>
                  <tr className="border-bottom">
                    <th scope="row">1</th>
                    <td>Login</td>
                    <td>John Doe has login</td>
                    <td>10 Aug 2023 at 18:31</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
