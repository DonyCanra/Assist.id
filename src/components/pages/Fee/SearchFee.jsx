import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFee } from "../../../store/actions/thunks";
import { DateRangePicker } from "rsuite";

export default function SearchComponent() {
  const [isCardOneVisible, setCardOneVisible] = useState(true);
  const [input, setInput] = useState({
    startDate: " ",
    endDate: " ",
    transactionNo: "",
    employeeName: "",
    phoneNumber: "",
    employeeEmail: "",
    status: "",
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
      startDate: "",
      endDate: "",
      transactionNo: "",
      name: "",
      phoneNumber: "",
      email: "",
      status: "",
      page: 1,
      limit: 10,
    });

    // Fetch employee data with default values
    dispatch(
      fetchFee({
        startDate: "",
        endDate: "",
        transactionNo: "",
        employeeName: "",
        phoneNumber: "",
        employeeEmail: "",
        status: "",
        page: 1,
        limit: 10,
      })
    );
  };

  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });

  const changeStartDate = selectedDate.startDate;
  const changeEndDate = selectedDate.endDate;

  const inputStartDate = new Date(changeStartDate);
  const inputEndDate = new Date(changeEndDate);

  const formattedStartDate = inputStartDate.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedEndDate = inputEndDate.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  input.startDate = formattedStartDate;
  input.endDate = formattedEndDate;

  const handleDateSelect = (value) => {
    setSelectedDate({
      startDate: value[0],
      endDate: value[1],
    });
  };

  const handleResetClick = () => {
    handleReset();
    setSelectedDate({
      startDate: "",
      endDate: "",
    });
  };

  const styles = {
    width: "100%",
    display: "block",
    marginBottom: 10,
  };

  const calendarStyles = {
    backgroundColor: "black",
  };

  const handleFilter = async (event) => {
    if (input.startDate === "" || input.startDate === "Invalid Date") {
      input.startDate = "";
    }
    if (input.endDate === "" || input.endDate === "Invalid Date") {
      input.endDate = "";
    }
    event.preventDefault();
    await dispatch(fetchFee(input));
  };

  const toggleCardVisibility = () => {
    setCardOneVisible(!isCardOneVisible);
  };

  return (
    <div
      className="card-body text-white"
      style={{
        margin: "0 20px 20px 20px",
        padding: "0px 0px 0px 0px",
        background: "#2B2E3F",
        borderRadius: "5px",
      }}
    >
      {isCardOneVisible ? (
        <div className="" style={{ height: "56px" }}>
          <div className="page-header" style={{ margin: "20px 20px 20px 20px" }}>
            <div className="page-leftheader">
              <h4 style={{ marginTop: "10px" }} className="page-title mb-0 text-primary">
                Search
              </h4>
            </div>
            <div className="page-rightheader">
              <i style={{ color: "#3E80EB", fontSize: "24px", marginTop: "10px" }} className="fa fa-chevron-circle-down" onClick={toggleCardVisibility}></i>
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
          <div className="card-body pb-2">
            <div className="row row-sm">
              <div className="col-lg">
                <label className="form-label">Transaction Date</label>
                <DateRangePicker size="md" placeholder="Transaction Date" style={styles} calendarStyle={calendarStyles} value={[selectedDate.startDate, selectedDate.endDate]} onChange={handleDateSelect} />
              </div>
              <div className="col-lg">
                <label className="form-label">Name</label>
                <input value={input.name} onChange={handleChange} name="name" className="form-control mb-4" placeholder="Input name" type="text" />
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
                  <option disabled value="">
                    Open this select menu
                  </option>
                  <option value="SUCCESS">Success</option>
                  <option value="FAILED">Failed</option>
                </select>
              </div>
            </div>
            <div className="row row-sm">
              <div className="col-lg">
                <label className="form-label">Phone Number</label>
                <input value={input.phoneNumber} onChange={handleChange} name="phoneNumber" className="form-control mb-4" placeholder="Input phone number" type="number" />
              </div>
              <div className="col-lg">
                <label className="form-label">Transaction Number</label>
                <input value={input.transactionNo} onChange={handleChange} name="transactionNo" className="form-control mb-4" placeholder="Input transaction number" type="text" />
              </div>
              <div className="col-lg">
                <label className="form-label">Email</label>
                <input value={input.email} onChange={handleChange} name="email" className="form-control mb-4" placeholder="Input email" type="text" />
              </div>
            </div>
            <div className="row row-sm">
              <div className="col-lg">
                <div className="page-header">
                  <div className="page-leftheader">
                    <button onClick={handleResetClick} className="btn btn-danger page-leftheader">
                      Reset
                    </button>
                  </div>
                  <div className="page-rightheader">
                    <button onClick={handleFilter} className="btn btn-primary ms-1 page-rightheader" type="submit">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
