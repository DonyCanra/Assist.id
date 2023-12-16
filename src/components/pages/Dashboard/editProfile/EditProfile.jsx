import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../../../../store/actions/thunks";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import "./Employee.css";

export default function EditProfile() {
  const { profile } = useSelector((state) => {
    return state.profile;
  });
  console.log(profile, "profile");

  const [input, setInput] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    avatar: "",
  });

  function separateBase64String(base64String) {
    const commaIndex = base64String.indexOf(",");

    if (commaIndex !== -1) {
      // const header = base64String.slice(0, commaIndex + 1);
      const body = base64String.slice(commaIndex + 1);

      return body;
    } else {
      // Handle jika string tidak mengandung koma
      return null;
    }
  }

  console.log(input.avatar, "<<< avatar");

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // Lakukan validasi atau manipulasi lainnya jika diperlukan
    setSelectedImage(file);
  };

  const handleUpload = () => {
    const file = selectedImage;

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        // Set nilai Base64 ke state
        setInput({
          avatar: separateBase64String(reader.result),
        });
      };
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  useEffect(() => {
    if (profile) {
      setInput({
        name: profile.name,
        phoneNumber: profile.phoneNumber,
        email: profile.email,
        avatar: profile.avatar,
      });
    }
  }, [profile]);

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // const handleUpdateEmployee = async (event) => {
  //   event.preventDefault();
  //   event.persist();
  //   try {
  //     await dispatch(updateEmployee(dataInput));
  //     navigate("/employee");
  //   } catch (error) {
  //     console.error("Error updating employee:", error);
  //   }
  // };
  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="card" style={{ background: "#212332" }}>
            <div className="page-header" style={{ margin: "20px 20px 20px 20px" }}>
              <div className="page-leftheader">
                <h4 className="page-title mb-0 text-primary">Edit Profile</h4>
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
                  <input value={input.name} onChange={handleChange} name="name" type="text" className="form-control" placeholder="" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Phone Number <span className="text-red">*</span>
                  </label>
                  <input value={input.phoneNumber} onChange={handleChange} name="phoneNumber" type="text" className="form-control" placeholder="" />
                </div>
              </div>

              <div>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <button onClick={handleUpload}>Upload</button>
                {selectedImage && (
                  <div>
                    <p>Preview:</p>
                    <img src={URL.createObjectURL(selectedImage)} alt="Preview" style={{ maxWidth: "100%", height: "auto" }} />
                  </div>
                )}
              </div>

              <div className="col-lg-12 col-xl-8">
                <button onClick={handleUpload} class="btn btn-pill btn-dark mb-2">
                  Choose File
                </button>
                {selectedImage && (
                  <div className="box-widget widget-user">
                    <div className="widget-user-image1 d-xl-flex d-block">
                      <img alt="" className="avatar" style={{ borderRadius: "20px" }} src={URL.createObjectURL(selectedImage)} />
                    </div>
                  </div>
                )}
              </div>
              <div className="col-sm-6 col-md-6">
                <div className="form-group">
                  <div className="form-group"></div>
                </div>
                <button className="btn btn-danger">Cancel</button>
                <button className="btn btn-primary ms-1">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
