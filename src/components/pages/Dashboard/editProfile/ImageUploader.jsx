import { useEffect, useState } from "react";
import { convertImages } from "../../../../store/actions/thunks";
import separateBase64String from "../../../../utils/separateBase64String";
import { useDispatch } from "react-redux";

const ImageUploader = ({ profile }) => {
  // console.log(profile.avatar, "image");
  const [selectedImage, setSelectedImage] = useState({
    fileName: "",
    preview: "",
  });

  console.log(selectedImage, "selectedImages");
  const dispatch = useDispatch();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage({
      fileName: file,
      preview: URL.createObjectURL(file),
    });
    // onImageChange(file);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = async () => {
        // setSelectedImage({
        //   fileName: separateBase64String(reader.result),
        // });
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
    <div className="col-lg-12 col-xl-8">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {/* {selectedImage.fileName && ( */}
      <div className="box-widget widget-user">
        <div className="widget-user-image1 d-xl-flex d-block">
          <img alt="" className="avatar" style={{ borderRadius: "20px" }} src={selectedImage.preview} />
        </div>
      </div>
      {/* // )} */}
    </div>
  );
};

export default ImageUploader;
