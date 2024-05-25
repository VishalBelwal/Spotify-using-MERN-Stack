import React from "react";
import { openUploadWidget } from "../../utils/CloudinaryService"; // Ensure this is the correct path
import { cloudinary_upload_preset } from "../../../config"; // Ensure this is the correct path

const CloudinaryUpload = ({ setUrl, setName }) => {
  const uploadImageWidget = () => {
    const options = {
      cloudName: "dd5wtau16",
      uploadPreset: cloudinary_upload_preset,
      sources: ["local"], // Allows only local files to be uploaded
    };

    const callback = (error, result) => {
      if (!error && result.event === "success") {
        setUrl(result.info.secure_url);
        setName(result.info.original_filename);
      } else {
        if (error) {
          console.log("Upload Widget Error:", error);
        } else {
          console.log("Upload Widget Event:", result.event);
        }
      }
    };

    let myUploadWidget = openUploadWidget(options, callback);
    myUploadWidget.open();
  };

  return (
    <button
      className="bg-white text-black rounded-full p-4 font-semibold"
      onClick={uploadImageWidget}
    >
      Select Track
    </button>
  );
};

export default CloudinaryUpload;
