import { v2 as cloudinary } from "cloudinary";
import cloudinaryConfig from "../config/cloudinaryConfig.js";

cloudinary.config(cloudinaryConfig);

const uploadCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "file-uploader", resource_type: "auto" },
      (error, uploadResult) => {
        if (error) return reject(error);
        return resolve(uploadResult);
      }
    );
    uploadStream.end(buffer);
  });
};

export default uploadCloudinary;
