import { useState } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../../../store/actions/thunks";

export default function SearchComponent() {
  const [isCardOneVisible, setCardOneVisible] = useState(true);
  const [input, setInput] = useState({
    status: "",
    name: "",
    phoneNumber: "",
    email: "",
    role: "",
    page: 1,
    limit: 10,
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleReset = () => {
    setInput({
      status: "",
      name: "",
      phoneNumber: "",
      email: "",
      role: "",
    });
  };

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleFilter = async (event) => {
    event.preventDefault();
    await dispatch(fetchUser(input, "<<<<"));
    // navigate("/employee");
  };

  const toggleCardVisibility = () => {
    setCardOneVisible(!isCardOneVisible);
  };

  return (
    <div
      className="card-body"
      style={{
        margin: "0 20px 20px 20px",
        padding: "0px 0px 0px 0px",
        background: "#2B2E3F",
        borderRadius: "5px",
      }}
    >
      {isCardOneVisible ? (
        <div>
          <div className="page-header" style={{ margin: "20px 20px 20px 20px" }}>
            <div className="page-leftheader">
              <h4 className="page-title mb-0 text-primary">Search</h4>
            </div>
            <div className="page-rightheader">
              <i style={{ color: "#3E80EB", fontSize: "24px" }} className="fa fa-chevron-circle-down" onClick={toggleCardVisibility}></i>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="page-header" style={{ margin: "0px 0px 20px 0px", padding: "20px 20px 20px 20px", borderBottom: "1px solid white" }}>
            <div className="page-leftheader">
              <h4 className="page-title mb-0 text-primary">Search</h4>
            </div>
            <div className="page-rightheader">
              <i style={{ color: "#3E80EB", fontSize: "24px" }} className="fa fa-chevron-circle-up" onClick={toggleCardVisibility}></i>
            </div>
          </div>
          <form onSubmit={handleFilter}>
            <div className="card-body pb-2">
              <div className="row row-sm">
                <div className="col-lg">
                  <label className="form-label">Name</label>
                  <input value={input.name} onChange={handleChange} name="name" className="form-control mb-4" placeholder="Input Name" type="text" />
                </div>
                <div className="col-lg">
                  <label className="form-label">Email</label>
                  <input value={input.email} onChange={handleChange} name="email" className="form-control mb-4" placeholder="Input Email" type="text" />
                </div>
                <div className="col-lg mb-3">
                  <label className="form-label">Role</label>
                  <select
                    value={input.role}
                    onChange={handleChange}
                    name="role"
                    className="form-select"
                    aria-label="select example"
                    style={{
                      background: "#2B2E3F",
                      color: "#fff",
                      border: "1px solid #707070",
                    }}
                  >
                    <option value="">Open this select menu</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
              </div>
              <div className="row row-sm">
                <div className="col-lg">
                  <label className="form-label">Phone Number</label>
                  <input value={input.phoneNumber} onChange={handleChange} name="phoneNumber" className="form-control mb-4" placeholder="Input Phone Number" type="text" />
                </div>
                <div className="col-lg mb-3">
                  <label className="form-label">Status</label>
                  <select
                    value={input.status}
                    onChange={handleChange}
                    name="status"
                    className="form-select"
                    aria-label="select example"
                    style={{
                      background: "#2B2E3F",
                      color: "#fff",
                      border: "1px solid #707070",
                    }}
                  >
                    <option value="">Open this select menu</option>
                    <option value="Active">Active</option>
                    <option value="InActive">InActive</option>
                  </select>
                </div>
              </div>
              <div className="row row-sm">
                <div className="col-lg">
                  <div className="page-header">
                    <div className="page-leftheader">
                      <button onClick={handleReset} className="btn btn-danger page-leftheader">
                        Reset
                      </button>
                    </div>
                    <div className="page-rightheader">
                      <button className="btn btn-primary ms-1 page-rightheader" type="submit">
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}