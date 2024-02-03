import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Modal, Button } from "react-bootstrap";
import "./editEmployee.css"
import { fetchDetailEmployee, fetchDistrict, fetchProvince, fetchRegency, fetchVillage, updateEmployee } from "../../store/actions/thunks";

export default function AddEmployee() {
  const { employee } = useSelector((state) => state.employee);
  const { province } = useSelector((state) => state.province);
  const { regency } = useSelector((state) => state.regency);
  const { district } = useSelector((state) => state.district);
  const { village } = useSelector((state) => state.village);

  // console.log(employee, "detail");

  const dataProvince = province;
  const dataRegency = regency;
  const dataDistrict = district;
  const dataVillage = village;

  const [input, setInput] = useState({
    name: "",
    address: "",
    province: "",
    regency: "",
    district: "",
    village: "",
  });

  // console.log(input, "input");

  const employeeProvince = dataProvince.find((obj) => obj.name === input.province);
  const employeeRegency = dataRegency.find((obj) => obj.name === input.regency);
  const employeeDistrict = dataDistrict.find((obj) => obj.name === input.district);
  const employeeVillage = dataVillage.find((obj) => obj.name === input.village);

  const employeeIdProvince = employeeProvince ? employeeProvince.id : "";
  const employeeIdRegency = employeeRegency ? employeeRegency.id : "";
  const employeeIdDistrict = employeeDistrict ? employeeDistrict.id : "";
  const employeeIdVillage = employeeVillage ? employeeVillage.id : "";

  const containsDigits = (inputString) => /\d/.test(inputString);

  const containsDigitsProvince = containsDigits(input.province) ? input.province : employeeIdProvince;
  const containsDigitsRegency = containsDigits(input.regency) ? input.regency : employeeIdRegency;
  const containsDigitsDistrict = containsDigits(input.district) ? input.district : employeeIdDistrict;
  const containsDigitsVillage = containsDigits(input.village) ? input.village : employeeIdVillage;

  // console.log(containsDigitsProvince, "1");
  // console.log(containsDigitsRegency, "2");
  // console.log(containsDigitsDistrict, "3");
  // console.log(containsDigitsVillage, "4");

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleCloseConfirmationModal = () => setShowConfirmationModal(false);
  const handleShowConfirmationModal = () => setShowConfirmationModal(true);

  const handleCancel = () => {
    navigate("/");
  };

  const handleAutocompleteChange = (name, value) => {
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value ? value.id : "",
    }));

    // Check the name of the input field and fetch data accordingly
    switch (name) {
      case "province":
        dispatch(fetchRegency(value ? value.id : ""));
        setInput((prevInput) => ({
          ...prevInput,
          regency: "",
          district: "",
          village: "",
        }));
        break;
      case "regency":
        dispatch(fetchDistrict(value ? value.id : ""));
        setInput((prevInput) => ({
          ...prevInput,
          district: "",
          village: "",
        }));
        break;
      case "district":
        dispatch(fetchVillage(value ? value.id : ""));
        setInput((prevInput) => ({
          ...prevInput,
          village: "",
        }));
        break;
      default:
        break;
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    // Check the name of the input field and fetch data accordingly
    switch (name) {
      case "province":
        dispatch(fetchRegency(value));
        setInput((prevInput) => ({
          ...prevInput,
          regency: "",
          district: "",
          village: "",
        }));
        break;
      case "regency":
        dispatch(fetchDistrict(value));
        setInput((prevInput) => ({
          ...prevInput,
          district: "",
          village: "",
        }));
        break;
      case "district":
        dispatch(fetchVillage(value));
        setInput((prevInput) => ({
          ...prevInput,
          village: "",
        }));
        break;
      default:
        break;
    }
  };

  const selectedProvince = dataProvince.find((obj) => obj.id === input.province);
  const selectedRegency = dataRegency.find((obj) => obj.id === input.regency);
  const selectedDistrict = dataDistrict.find((obj) => obj.id === input.district);
  const selectedVillage = dataVillage.find((obj) => obj.id === input.village);

  const inputProvince = selectedProvince ? selectedProvince.name : "";
  const inputRegency = selectedRegency ? selectedRegency.name : "";
  const inputDistrict = selectedDistrict ? selectedDistrict.name : "";
  const inputVillage = selectedVillage ? selectedVillage.name : "";

  const inputUpdateEmployee = {
    nama: input.name,
    jalan: input.address,
    provinsi: inputProvince ? inputProvince : input.province,
    kabupaten: inputRegency ? inputRegency : input.regency,
    kecamatan: inputDistrict ? inputDistrict : input.district,
    kelurahan: inputVillage ? inputVillage : input.village,
  };

  // console.log(inputUpdateEmployee, "inputtt");

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.persist();

    try {
      await dispatch(updateEmployee(inputUpdateEmployee, id));
      handleCloseConfirmationModal();
      navigate("/");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  useEffect(() => {
    if (employee) {
      const employeeProvince = employee.provinsi || "";
      const employeeRegency = employee.kabupaten || "";
      const employeeDistrict = employee.kecamatan || "";
      const employeeVillage = employee.kelurahan || "";

      setInput({
        name: employee.nama,
        address: employee.jalan,
        province: employeeProvince,
        regency: employeeRegency,
        district: employeeDistrict,
        village: employeeVillage,
      });
    }
  }, [employee]);

  useEffect(() => {
    // Fetch list of detail employee
    dispatch(fetchDetailEmployee(id));
  }, [dispatch, id]);

  useEffect(() => {
    // Fetch list of provinces
    dispatch(fetchProvince());
  }, [dispatch]);

  useEffect(() => {
    // Fetch list of provinces conditionally based on input.province
    if (input.province) {
      dispatch(fetchRegency(employeeIdProvince));
    }
  }, [input.province, employeeIdProvince, dispatch]);

  useEffect(() => {
    // Fetch list of provinces conditionally based on input.province
    if (input.regency) {
      dispatch(fetchDistrict(employeeIdRegency));
    }
  }, [input.regency, employeeIdRegency, dispatch]);

  useEffect(() => {
    // Fetch list of provinces conditionally based on input.province
    if (input.district) {
      dispatch(fetchVillage(employeeIdDistrict));
    }
  }, [input.district, employeeIdDistrict, dispatch]);

  return (
    <>
      <div className="row text-white">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="card" style={{ background: "#212332" }}>
            <div className="page-header" style={{ margin: "20px 20px 20px 20px" }}>
              <div className="page-leftheader">
                <h4 className="page-title mb-0 text-primary">Edit Employee</h4>
              </div>
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
                    name="province"
                    value={dataProvince.find((option) => option.id === containsDigitsProvince) || null}
                    onChange={(event, value) => handleAutocompleteChange("province", value)}
                    options={dataProvince}
                    getOptionLabel={(option) => option.name}
                    disablePortal
                    id="combo-box-demo"
                    sx={{ width: "100%", height: "20%" }}
                    renderInput={(params) => <TextField {...params} label="Select Province" onChange={handleChange} />}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Regency <span className="text-red">*</span>
                  </label>
                  <select
                    name="regency"
                    value={containsDigitsRegency}
                    onChange={handleChange}
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
                    name="district"
                    value={containsDigitsDistrict}
                    onChange={handleChange}
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
                    name="village"
                    value={containsDigitsVillage}
                    onChange={handleChange}
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
        <Modal.Body style={{ background: "#2B2E3F" }}>Are you sure to update employee?</Modal.Body>
        <Modal.Footer style={{ background: "#2B2E3F" }}>
          <Button variant="btn btn-danger" onClick={handleCloseConfirmationModal}>
            Close
          </Button>
          <Button onClick={handleSubmit} variant="secondary">Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
