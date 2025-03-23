import { param, validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";
import deleteCloudinary from "../utils/deleteCloudinary.js";

const prisma = new PrismaClient();

const validateFileId = [
  param("fileId")
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage("Task Id must be a positive integer"),
];

const deletePost = [
  validateFileId,
  async (req, res) => {
    const { fileId } = req.params;

    try {
      const errors = validationResult(req);

      const allFile = await prisma.file.findMany({
        where: {
          owner_id: req.user.user_id,
        },
      });

      if (!errors.isEmpty()) {
        const errorsMsg = [{ msg: "Invalid File Id" }];
        return res.render("dashboard", { files: allFile, errors: errorsMsg });
      }

      const specificFile = await prisma.file.findUnique({
        where: {
          file_id: parseInt(fileId),
        },
      });

      if (specificFile.owner_id !== req.user.user_id) {
        const errorsMsg = [{ msg: "You don't have access to that File" }];
        return res.render("dashboard", { files: allFile, errors: errorsMsg });
      }

      const filePublicId = specificFile.public_id;
      const isImageDeleted = await deleteCloudinary(filePublicId, "image");
      if (isImageDeleted.result == "not found") {
        await deleteCloudinary(filePublicId, "raw");
      }

      await prisma.file.delete({
        where: {
          file_id: parseInt(fileId),
        },
      });

      const newAllFile = await prisma.file.findMany({
        where: {
          owner_id: req.user.user_id,
        },
      });

      return res.render("dashboard", {
        files: newAllFile,
        success: "File deleted successfully",
      });
    } catch (error) {
      const newAllFile = await prisma.file.findMany({
        where: {
          owner_id: req.user.user_id,
        },
      });
      const errorsMsg = [{ msg: "There is an error deleting the File" }];
      return res.render("dashboard", { files: newAllFile, errors: errorsMsg });
    }
  },
];

export default deletePost;
