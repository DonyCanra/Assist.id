import { Link } from "react-router-dom";
import SearchComponent from "./SearchRole";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRole } from "../../../../store/actions/thunks";
import Row from "./RoleTableRaw";

export default function UserList() {
  const { roles } = useSelector((state) => {
    return state.roles;
  });
  
  const dataTable = roles;

  const [inputDefault] = useState({
    search: "",
    status: "",
  });

  const dataLocal = JSON.parse(localStorage.privilege);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRole(inputDefault));
  }, [dispatch, inputDefault]);

  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="card" style={{ background: "#212332" }}>
            <div className="page-header" style={{ margin: "20px 20px 20px 20px" }}>
              <div className="page-leftheader">
                <h4 className="page-title mb-0 text-primary">Role</h4>
              </div>
              <div className="page-rightheader">
                <div className="btn-list">
                  <Link className="btn btn-secondary" to="/add-role" style={{ cursor: "pointer", display: dataLocal.roleAdd ? "block" : "none" }}>
                    {/* <button className="btn btn-secondary"> */}
                    <i className="fe fe-plus me-2"></i> Add New Data
                    {/* </button> */}
                  </Link>
                </div>
              </div>
            </div>

            <SearchComponent />

            <div
              className="card-body"
              style={{
                margin: "20px 20px 20px 20px",
                background: "#2B2E3F",
                borderRadius: "5px",
              }}
            >
              <div className="table-responsive">
                <table className="table table-bordered card-table table-vcenter text-nowrap">
                  <thead text-center>
                    <tr className="border-top border-bottom">
                      <th className="wd-15p border-bottom-0">Role ID.</th>
                      <th className="wd-15p border-bottom-0">Role Name</th>
                      <th className="wd-25p border-bottom-0">Status</th>
                      <th className="wd-25p border-bottom-0">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {dataTable?.map((role, index) => {
                      return <Row key={index} role={role} index={index} />;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
