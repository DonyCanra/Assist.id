import { useState } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { fetchEmployee } from "../../../../store/actions/thunks";

export default function SearchComponent() {
  const [isCardOneVisible, setCardOneVisible] = useState(true);
  const [input, setInput] = useState({
    isCandidate: "Yes",
    name: "",
    nik: "",
    email: "",
    phoneNumber: "",
    // employeeStatus: true,
    // registeredStatus: true,
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
      status: "kandidat",
      name: "",
      nik: "",
      email: "",
      phoneNumber: "",
      page: 1,
      limit: 10,
    });
  };

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleFilter = async (event) => {
    event.preventDefault();
    await dispatch(fetchEmployee(input, "<<<<"));
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
                  <input value={input.name} onChange={handleChange} name="name" className="form-control mb-4" placeholder="Input box" type="text" />
                </div>
                <div className="col-lg">
                  <label className="form-label">Phone Number</label>
                  <input value={input.phoneNumber} onChange={handleChange} name="phoneNumber" className="form-control mb-4" placeholder="Input box" type="text" />
                </div>
                <div className="col-lg mb-3">
                  <label className="form-label">Registered Status</label>
                  <select
                    value={input.registeredStatus}
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
                    <option value="true">Registered</option>
                    <option value="false">Not Registered</option>
                  </select>
                </div>
              </div>
              <div className="row row-sm">
                <div className="col-lg">
                  <label className="form-label">NIK</label>
                  <input value={input.nik} onChange={handleChange} name="nik" className="form-control mb-4" placeholder="Input box" type="text" />
                </div>
                <div className="col-lg">
                  <label className="form-label">Email</label>
                  <input value={input.email} onChange={handleChange} name="email" className="form-control mb-4" placeholder="Input box" type="text" />
                </div>
                <div className="col-lg mb-3">
                  <label className="form-label">Employee Status</label>
                  <select
                    value={input.employeeStatus}
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
