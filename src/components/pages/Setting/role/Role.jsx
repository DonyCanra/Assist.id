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

  const [inputDefault, setInputDefault] = useState({
    search: "",
    status: "",
  });

  const dataLocal = JSON.parse(localStorage.privilege);

  const pageCount = roles.totalPage; // Jumlah halaman yang ingin ditampilkan

  const handlePageChange = (page) => {
    setInputDefault((prevInput) => ({
      ...prevInput,
      page,
    }));
  };

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
                <div className="btn-list" style={{ cursor: "pointer", display: dataLocal.roleAdd ? "" : "none" }}>
                  <Link className="btn btn-secondary" to="/add-role">
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
              <div className="row row-sm">
                <div className="col-lg">
                  <div className="page-header">
                    <div className="page-leftheader">
                      <div className="dataTables_info text-white" id="example2_info" role="status" aria-live="polite">
                        Showing 1 to {inputDefault.page} of {roles.totalPage} entries
                      </div>
                    </div>
                    <div className="page-rightheader">
                      <div className="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                        <ul className="pagination">
                          <li className={inputDefault.page === 1 ? "paginate_button page-item disabled" : "paginate_button page-item"} onClick={() => inputDefault.page > 1 && handlePageChange(inputDefault.page - 1)}>
                            <Link href="#" aria-controls="example2" data-dt-idx="0" tabindex="0" className="page-link">
                              Previous
                            </Link>
                          </li>
                          {[...Array(pageCount)]?.map((_, index) => (
                            <li key={index} className={`paginate_button page-item ${inputDefault.page === index + 1 ? "active" : ""}`} onClick={() => handlePageChange(index + 1)}>
                              <Link href="#" aria-controls="example2" data-dt-idx={index + 1} tabindex="0" className="page-link">
                                {index + 1}
                              </Link>
                            </li>
                          ))}
                          <li
                            className={inputDefault.page === roles.totalPage ? "paginate_button page-item disabled" : "paginate_button page-item"}
                            onClick={() => inputDefault.page < roles.totalPage && handlePageChange(inputDefault.page + 1)}
                          >
                            <Link href="#" aria-controls="example2" data-dt-idx={pageCount + 1} tabindex="0" className="page-link">
                              Next
                            </Link>
                          </li>
                        </ul>
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
