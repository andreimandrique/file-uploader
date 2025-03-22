import multer from "multer";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const addFileGet = (req, res) => {
  res.render("addFile");
};

const addFilePost = [
  upload.single("myFile"),
  async (req, res) => {
    if (!req.file) {
      const errors = [{ msg: "No file upload or file is too big" }];
      res.render("addFile", { errors: errors });
    }

    try {
      const cloudinaryFile = await uploadToCloudinary(req.file.buffer);
      await prisma.file.create({
        data: {
          file_name: req.file.originalname,
          public_id: cloudinaryFile.public_id,
          bytes: cloudinaryFile.bytes,
          secure_url: cloudinaryFile.secure_url,
          owner_id: req.user.user_id,
        },
      });
      res.render("addFile", {
        success: `File ${req.file.originalname} upload Successfully`,
      });
    } catch (error) {
      const errors = [{ msg: "There is an error uploading the file" }];
      res.render("addFile", { errors: errors });
    }
  },
];

export { addFileGet, addFilePost };
