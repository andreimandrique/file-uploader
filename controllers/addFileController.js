import multer from "multer";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const addFileGet = (req, res) => {
  res.render("addFile");
};

const addFilePost = [
  upload.single("myFile"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded or file too large");
    }
    uploadToCloudinary(req.file.buffer)
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

    res.render("addFile");
  },
];

export { addFileGet, addFilePost };
