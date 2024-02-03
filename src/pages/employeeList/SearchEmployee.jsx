import { useState } from "react";

export default function SearchComponent() {
  const [isCardOneVisible, setCardOneVisible] = useState(true);

  const toggleCardVisibility = () => {
    setCardOneVisible(!isCardOneVisible);
  };

  const handleSearch = () => {
    alert("Belum di buat")
  };

  return (
    <>
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
                <label className="form-label">Name</label>
                <input name="name" className="form-control mb-4" placeholder="Input name" type="text" />
              </div>
              <div className="col-lg">
                <label className="form-label">Address</label>
                <input name="phoneNumber" className="form-control mb-4" placeholder="Input address" type="text" />
              </div>
              <div className="col-lg">
                <label className="form-label">Province</label>
                <input name="phoneNumber" className="form-control mb-4" placeholder="Input province" type="text" />
              </div>
            </div>
            <div className="row row-sm">
              <div className="col-lg">
                <label className="form-label">Regency</label>
                <input name="nik" className="form-control mb-4" placeholder="Input regency" type="text" />
              </div>
              <div className="col-lg">
                <label className="form-label">District</label>
                <input name="email" className="form-control mb-4" placeholder="Input district" type="text" />
              </div>
              <div className="col-lg">
                <label className="form-label">Village</label>
                <input name="email" className="form-control mb-4" placeholder="Input village" type="text" />
              </div>
            </div>
            <div className="row row-sm">
              <div className="col-lg">
                <div className="page-header">
                  <div className="page-leftheader">
                    <button className="btn btn-danger page-leftheader">
                      Reset
                    </button>
                  </div>
                  <div className="page-rightheader">
                    <button onClick={handleSearch} className="btn btn-primary ms-1 page-rightheader">
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
    </>
  );
}
