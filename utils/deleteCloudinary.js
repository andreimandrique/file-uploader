import { v2 as cloudinary } from "cloudinary";
import cloudinaryConfig from "../config/cloudinaryConfig.js";

cloudinary.config(cloudinaryConfig);

const deleteCloudinary = (publicId, resourceType) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      { resource_type: resourceType },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export default deleteCloudinary;
