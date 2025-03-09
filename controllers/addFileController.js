import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import cloudinaryConfig from "../config/cloudinaryConfig.js";

const addFileGet = (req, res) => {
  res.render("addFile");
};

cloudinary.config(cloudinaryConfig);

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

const uploadToCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "file-uploader" },
      (error, uploadResult) => {
        if (error) return reject(error);
        return resolve(uploadResult);
      }
    );

    uploadStream.end(buffer);
  });
};

const addFilePost = [
  upload.single("myFile"),
  (req, res) => {
    uploadToCloudinary(req.file.buffer)
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

    res.render("addFile");
  },
];

export { addFileGet, addFilePost };
