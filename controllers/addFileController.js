import multer from "multer";
import uploadCloudinary from "../utils/uploadCloudinary.js";
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
      return res.render("addFile", { errors: errors });
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          user_id: req.user.user_id,
        },
      });
      const fileSize = req.file.size;
      const userLimit = user.limit;
      const newLimit = userLimit - fileSize;

      await prisma.user.update({
        where: {
          user_id: req.user.user_id,
        },
        data: {
          limit: newLimit,
        },
      });

      if (newLimit < 0) {
        await prisma.user.update({
          where: {
            user_id: req.user.user_id,
          },
          data: {
            limit: 0,
          },
        });
        const errors = [{ msg: "You reach your file limit" }];
        return res.render("addFile", { errors: errors });
      }

      if (req.file && req.file.mimetype) {
        // Image mimetypes
        const imageTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
          "image/svg+xml",
          "image/bmp",
          "image/tiff",
        ];

        // Raw document mimetypes
        const rawTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/zip",
          "application/x-zip-compressed",
          "application/json",
          "text/csv",
        ];

        // Check if mimetype is in either array
        const isImageOrRaw =
          imageTypes.includes(req.file.mimetype) ||
          rawTypes.includes(req.file.mimetype);

        if (!isImageOrRaw) {
          const errors = [{ msg: "Only accept image or raw" }];
          return res.render("addFile", { errors: errors });
        }
      }

      const cloudinaryFile = await uploadCloudinary(req.file.buffer);
      await prisma.file.create({
        data: {
          file_name: req.file.originalname,
          public_id: cloudinaryFile.public_id,
          bytes: cloudinaryFile.bytes,
          secure_url: cloudinaryFile.secure_url,
          owner_id: req.user.user_id,
        },
      });

      return res.render("addFile", {
        success: `File ${req.file.originalname} upload Successfully`,
      });
    } catch (error) {
      const errors = [{ msg: "There is an error uploading the file" }];
      return res.render("addFile", { errors: errors });
    }
  },
];

export { addFileGet, addFilePost };
