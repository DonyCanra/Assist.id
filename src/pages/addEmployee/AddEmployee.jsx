import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Modal, Button } from "react-bootstrap";
import "./addEmployee.css";
import { createEmployee, fetchDistrict, fetchProvince, fetchRegency, fetchVillage } from "../../store/actions/thunks";

export default function AddEmployee() {
  const { province } = useSelector((state) => state.province);
  const { regency } = useSelector((state) => state.regency);
  const { district } = useSelector((state) => state.district);
  const { village } = useSelector((state) => state.village);

  const dataProvince = province;
  const dataRegency = regency;
  const dataDistrict = district;
  const dataVillage = village;

  const modifiedDataProvince = dataProvince.map((el) => ({ label: `${el.name}`, id: el.id }));

  const [input, setInput] = useState({
    name: "",
    address: "",
    province: "",
    regency: "",
    district: "",
    village: "",
  });

  // console.log(input, "input");

  const selectedProvince = dataProvince.find((obj) => obj.id === input.province);
  const selectedRegency = dataRegency.find((obj) => obj.id === input.regency);
  const selectedDistrict = dataDistrict.find((obj) => obj.id === input.district);
  const selectedVillage = dataVillage.find((obj) => obj.id === input.village);

  const inputProvince = selectedProvince ? selectedProvince.name : "";
  const inputRegency = selectedRegency ? selectedRegency.name : "";
  const inputDistrict = selectedDistrict ? selectedDistrict.name : "";
  const inputVillage = selectedVillage ? selectedVillage.name : "";

  // console.log(inputProvince, "<<");
  // console.log(inputRegency, "<<");
  // console.log(inputDistrict, "<<");
  // console.log(inputVillage, "<<");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value, name } = event.target;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    if (name === "regency") {
      handleRegencyChange(value);
    } else if (name === "district") {
      handleDistrictChange(value);
    }
  };

  const handleProvinceChange1 = (event, newValue) => {
    const selectedProvince = newValue.id;
    setInput((prevInput) => ({
      ...prevInput,
      province: selectedProvince,
    }));
  };

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleCloseConfirmationModal = () => setShowConfirmationModal(false);
  const handleShowConfirmationModal = () => setShowConfirmationModal(true);

  const handleCancel = () => {
    navigate("/");
  };

  useEffect(() => {
    // Fetch list of provinces
    dispatch(fetchProvince());
  }, [dispatch]);

  useEffect(() => {
    // Fetch list of provinces conditionally based on input.province
    if (input.province) {
      dispatch(fetchRegency(input.province));
    }
  }, [input.province, dispatch]);

  const handleRegencyChange = (regencyId) => {
    dispatch(fetchDistrict(regencyId));
  };

  const handleDistrictChange = (districtId) => {
    dispatch(fetchVillage(districtId));
  };

  const inputCreateEmployee = {
    nama: input.name,
    jalan: input.address,
    provinsi: inputProvince,
    kabupaten: inputRegency,
    kecamatan: inputDistrict,
    kelurahan: inputVillage,
  };

  console.log(inputCreateEmployee, "inputtt");

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.persist();

    try {
      await dispatch(createEmployee(inputCreateEmployee));
      handleCloseConfirmationModal();
      navigate("/");
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <>
      <div className="row text-white">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="card" style={{ background: "#212332" }}>
            <div className="page-header" style={{ margin: "20px 20px 20px 20px" }}>
              <div className="page-leftheader">
                <h4 className="page-title mb-0 text-primary">Add New Employee</h4>
              </div>
              {/* <div className="page-rightheader">
                <div className="btn-list">
                  <Link to="/add-employee-excel">
                    <button className="btn btn-secondary">
                      <i className="fe fe-plus me-2"></i> Add New Data Bulk
                    </button>
                  </Link>
                </div>
              </div> */}
            </div>

            <div
              className="card-body"
              style={{
                margin: "20px 20px 20px 20px",
                background: "#2B2E3F",
                borderRadius: "5px",
              }}
            >
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Name <span className="text-red">*</span>
                  </label>
                  <input value={input.name} onChange={handleChange} name="name" type="text" className="form-control" placeholder="Input name employee" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Address <span className="text-red">*</span>
                  </label>
                  <input value={input.address} onChange={handleChange} name="address" type="text" className="form-control" placeholder="Input name employee" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Province <span className="text-red">*</span>
                  </label>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={modifiedDataProvince}
                    getOptionLabel={(option) => option.label}
                    onChange={handleProvinceChange1}
                    sx={{ width: "100%", height: "20%" }}
                    renderInput={(params) => <TextField {...params} placeholder="Select Province" />}
                  />
                </div>
              </div>
              {/* <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Province <span className="text-red">*</span>
                  </label>
                  <select
                    onChange={handleChange}
                    name="province"
                    value={input.province}
                    key={input.key}
                    className={`form-select ${errorMessages.province}`}
                    aria-label="select example"
                    style={{
                      background: "#2B2E3F",
                      color: "#fff",
                      border: "1px solid #707070",
                    }}
                  >
                    <option value="">Select Province</option>
                    {dataProvince.map((province) => (
                      <option key={province.name} value={province.id}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-danger">{errorMessages.province}</p>
                </div>
              </div> */}
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Regency <span className="text-red">*</span>
                  </label>
                  <select
                    onChange={handleChange}
                    name="regency"
                    value={input.regency}
                    className="form-select"
                    aria-label="select example"
                    style={{
                      background: "#2B2E3F",
                      color: "#fff",
                      border: "1px solid #707070",
                    }}
                  >
                    <option value="">Select Regency</option>
                    {dataRegency.map((regency) => (
                      <option key={regency.id} value={regency.id}>
                        {regency.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    District <span className="text-red">*</span>
                  </label>
                  <select
                    onChange={handleChange}
                    name="district"
                    value={input.district}
                    className="form-select"
                    aria-label="select example"
                    style={{
                      background: "#2B2E3F",
                      color: "#fff",
                      border: "1px solid #707070",
                    }}
                  >
                    <option value="">Select District</option>
                    {dataDistrict.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Village <span className="text-red">*</span>
                  </label>
                  <select
                    onChange={handleChange}
                    name="village"
                    value={input.village}
                    className="form-select"
                    aria-label="select example"
                    style={{
                      background: "#2B2E3F",
                      color: "#fff",
                      border: "1px solid #707070",
                    }}
                  >
                    <option value="">Select Village</option>
                    {dataVillage.map((village) => (
                      <option key={village.id} value={village.id}>
                        {village.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="page-header">
                  <div className="page-leftheader">
                    <button onClick={handleCancel} className="btn btn-danger page-leftheader">
                      Cancel
                    </button>
                  </div>
                  <div className="page-rightheader">
                    <button onClick={handleShowConfirmationModal} className="btn btn-primary ms-1 page-rightheader" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal className="text-white" show={showConfirmationModal} onHide={handleCloseConfirmationModal} centered>
        <Modal.Header style={{ background: "#2B2E3F" }} closeButton>
          <Modal.Title>CONFIRMATION</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#2B2E3F" }}>Are you sure to create employee?</Modal.Body>
        <Modal.Footer style={{ background: "#2B2E3F" }}>
          <Button variant="btn btn-danger" onClick={handleCloseConfirmationModal}>
            Close
          </Button>
          <Button onClick={handleSubmit} variant="secondary">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
