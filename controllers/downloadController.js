import { param, validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";
import downloadFromURL from "../utils/downloadFromURL.js";

const prisma = new PrismaClient();

const validateFileId = [
  param("fileId")
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage("Task Id must be a positive integer"),
];

const downloadPost = [
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

      if (allFile == []) {
        console.log("no file");
      }

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
      const fileUrl = specificFile.secure_url;
      const fileName = specificFile.file_name;
      const fileBuffer = await downloadFromURL(fileUrl);

      // Set response headers
      res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
      res.setHeader("Content-Type", "application/octet-stream");

      // Send file buffer as response
      res.send(fileBuffer);
    } catch (error) {
      const errorsMsg = [{ msg: "There is an error downloading the File" }];
      return res.render("dashboard", { files: allFile, errors: errorsMsg });
    }
  },
];

export default downloadPost;
