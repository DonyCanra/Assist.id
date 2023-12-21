import React, { useState, useRef } from "react";
import * as xlsx from "xlsx";
import DataBulkTableModal from "./DataBulkTableModal";
import { useNavigate } from "react-router-dom";

export default function AddEmployeeDataBulk() {
  const [dataBulk, setDatabulk] = useState({
    data: [],
  });
  const [modalShow, setModalShow] = React.useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const uploadInputRef = useRef(null);
  const navigate = useNavigate();

  const readUploadFile = (e) => {
    e.preventDefault();

    if (e.target.files) {
      const reader = new FileReader();
      const file = e.target.files[0];

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);

        setDatabulk({
          data: json,
        });

        // Reset progress and hide label after 2 seconds
        setTimeout(() => {
          setUploadProgress(0);
        }, 3000);
      };

      reader.readAsArrayBuffer(file);

      // Simulate upload progress
      let progress = 0;
      const intervalId = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);

        if (progress >= 100) {
          clearInterval(intervalId);
        }
      }, 200);
    }
  };

  const handleDelete = (index) => {
    const newData = [...dataBulk.data];
    newData.splice(index, 1);
    setDatabulk({ data: newData });
  };

  const handleCancelClick = () => {
    navigate("/add-employee");
  };

  const handleIconClick = async () => {
    setModalShow(true);
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="card" style={{ background: "#212332", width: "100%", height: "573px", flexShrink: "0" }}>
            <div className="page-header" style={{ margin: "20px 20px 20px 20px" }}>
              <div className="page-leftheader">
                <h4 className="page-title mb-0 text-primary">Add New Employee Bulk</h4>
              </div>
            </div>
            <div
              className="card-body text-center"
              style={{
                margin: "20px 20px 20px 20px",
                background: "#2B2E3F",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="text-center"
                style={{
                  width: "749px",
                  height: "258px",
                  flexShrink: "0",
                  border: "1px dashed #fff",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input type="file" id="upload" onChange={readUploadFile} style={{ display: "none" }} ref={uploadInputRef} />
                <label htmlFor="upload" style={{ cursor: "pointer" }}>
                  {/* SVG Path */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="121" height="121" viewBox="0 0 121 121" fill="none">
                    {/* ... (SVG Path) */}
                    <path d="M111.5 0.5H9.5C4.52944 0.5 0.5 4.52944 0.5 9.5V111.5C0.5 116.471 4.52944 120.5 9.5 120.5H111.5C116.471 120.5 120.5 116.471 120.5 111.5V9.5C120.5 4.52944 116.471 0.5 111.5 0.5Z" fill="#212332" />
                    <path d="M111.5 1H9.5C4.80558 1 1 4.80558 1 9.5V111.5C1 116.194 4.80558 120 9.5 120H111.5C116.194 120 120 116.194 120 111.5V9.5C120 4.80558 116.194 1 111.5 1Z" stroke="#B0BECE" />
                    <path
                      d="M82.7284 46.7259H61.9924C59.3564 46.7259 58.5554 45.3799 56.6654 43.2039C56.0392 42.5492 55.2815 42.0346 54.4421 41.6938C53.6027 41.3531 52.7007 41.1939 51.7954 41.2269H40.1084C39.5668 41.2269 39.0305 41.3336 38.5302 41.5408C38.0298 41.7481 37.5752 42.0518 37.1923 42.4348C36.8093 42.8177 36.5056 43.2724 36.2983 43.7727C36.0911 44.2731 35.9844 44.8093 35.9844 45.3509V70.0979C35.9844 70.6395 36.0911 71.1757 36.2983 71.6761C36.5056 72.1764 36.8093 72.6311 37.1923 73.014C37.5752 73.397 38.0298 73.7007 38.5302 73.908C39.0305 74.1152 39.5668 74.2219 40.1084 74.2219H75.8544V61.8499H82.7284C83.27 61.85 83.8064 61.7435 84.3069 61.5363C84.8073 61.3291 85.2621 61.0253 85.6451 60.6424C86.0282 60.2594 86.3321 59.8047 86.5394 59.3043C86.7467 58.8039 86.8534 58.2676 86.8534 57.7259V50.8519C86.8536 50.3101 86.7471 49.7735 86.5399 49.2729C86.3328 48.7722 86.0289 48.3173 85.6458 47.9341C85.2628 47.551 84.8079 47.247 84.3073 47.0397C83.8068 46.8324 83.2702 46.7258 82.7284 46.7259Z"
                      fill="#004387"
                    />
                    <path
                      d="M83.8534 52.2266H38.9844C37.3275 52.2266 35.9844 53.5697 35.9844 55.2266V76.7236C35.9844 78.3804 37.3275 79.7236 38.9844 79.7236H83.8534C85.5102 79.7236 86.8534 78.3804 86.8534 76.7236V55.2266C86.8534 53.5697 85.5102 52.2266 83.8534 52.2266Z"
                      fill="#34A3D4"
                    />
                  </svg>
                  <div style={{ marginTop: "10px" }}>{uploadProgress === 0 ? "Choose File or Drop File here" : `Uploading: ${uploadProgress}%`}</div>
                  {dataBulk.data.length > 0 && <div style={{ marginTop: "10px" }}>File Uploaded: {uploadInputRef.current.files[0].name}</div>}
                </label>
              </div>
              <p
                style={{
                  color: "#3674FF",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "normal",
                  marginTop: "15px",
                }}
              >
                Download Format
              </p>
              <div className="col-lg" style={{ borderTop: "1px solid #3B405B" }}>
                <div className="page-header">
                  <div className="page-leftheader">
                    <button onClick={handleCancelClick} className="btn btn-danger page-leftheader">
                      Cancel
                    </button>
                  </div>
                  <div className="page-rightheader">
                    <button onClick={handleIconClick} className="btn btn-primary ms-1 page-rightheader" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <DataBulkTableModal show={modalShow} onHide={() => setModalShow(false)} dataBulk={dataBulk} handleDelete={handleDelete} />
          </div>
        </div>
      </div>
    </>
  );
}
