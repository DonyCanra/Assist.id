import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchComponent from "./SearchUser";
import { fetchUser } from "../../../../store/actions/thunks";
import Row from "./UserTableRaw";

export default function UserList() {
  const { users } = useSelector((state) => {
    console.log(state.users, "<<state data");
    return state.users;
  });
  const dataTable = users.data;
  // console.log(dataTable, "<<< dataaa");
  const [inputDefault] = useState({
    status: "",
    name: "",
    phoneNumber: "",
    email: "",
    page: 1,
    limit: 10,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(inputDefault));
  }, [dispatch, inputDefault]);
  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="card" style={{ background: "#212332" }}>
            <div className="page-header" style={{ margin: "20px 20px 20px 20px" }}>
              <div className="page-leftheader">
                <h4 className="page-title mb-0 text-primary">User List</h4>
              </div>
              <div className="page-rightheader">
                <div className="btn-list">
                  <Link className="btn btn-secondary" to="/add-user">
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
                    <tr className="border-top">
                      <th className="wd-15p border-bottom-0">No.</th>
                      <th className="wd-15p border-bottom-0">Name</th>
                      <th className="wd-15p border-bottom-0">Phone Number</th>
                      <th className="wd-10p border-bottom-0">Email</th>
                      <th className="wd-20p border-bottom-0">Role</th>
                      <th className="wd-25p border-bottom-0">Status</th>
                      <th className="wd-25p border-bottom-0">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {dataTable?.map((user, index) => {
                      return <Row key={index} user={user} index={index} />;
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
