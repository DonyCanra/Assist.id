import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile, updateProfile } from "../../../../store/actions/thunks";
import ImageUploader from "./ImageUploader";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import "./Employee.css";

export default function EditProfile() {
  const { profile } = useSelector((state) => state.profile);
  const { image } = useSelector((state) => state.image);
  console.log(image, "<< image");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    phoneNumber: "",
    avatar: "",
  });

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
      });
    }
  }, [profile]);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  input.avatar = image.fileName;
  console.log(input, "sebelum update");

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    event.persist();
    try {
      await dispatch(updateProfile(input));
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

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
              <form onSubmit={handleUpdateProfile}>
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

                <ImageUploader profile={profile} />

                <div className="col-sm-6 col-md-6">
                  <div className="form-group">
                    <div className="form-group"></div>
                  </div>
                  <button className="btn btn-danger">Cancel</button>
                  <button className="btn btn-primary ms-1" type="submit">
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
