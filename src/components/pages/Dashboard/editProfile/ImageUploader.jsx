import { useEffect, useState, useRef } from "react";
import { convertImages } from "../../../../store/actions/thunks";
import separateBase64String from "../../../../utils/separateBase64String";
import { useDispatch } from "react-redux";

const ImageUploader = ({ profile }) => {
  const [selectedImage, setSelectedImage] = useState({
    fileName: "",
    preview: "",
  });
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    // Validasi ukuran file
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file && file.size > maxSize) {
      setError("Image size is too large. Please choose an image below 5 MB.");
      return;
    }

    setSelectedImage({
      fileName: file,
      preview: URL.createObjectURL(file),
    });
    setError(""); // Clear any previous error

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = async () => {
        const input = {
          fileName: separateBase64String(reader.result),
        };
        await dispatch(convertImages(input));
      };
    }
  };

  useEffect(() => {
    if (profile) {
      setSelectedImage({
        preview: profile.avatar,
      });
    }
  }, [profile]);

  return (
    <div className="col-lg-12 col-xl-8 text-white">
      <button style={{ marginBottom: "10px", width: "149px", height: "35px" }} className="btn btn-pill btn-dark" type="button" onClick={() => fileInputRef.current.click()}>
        Choose File
      </button>

      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="box-widget widget-user">
        <div className="widget-user-image1 d-xl-flex d-block">
          <img alt="" className="avatar" style={{ borderRadius: "20px", width: "124px", height: "153px" }} src={selectedImage.preview} />
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
