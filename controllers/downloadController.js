import downloadFromURL from "../utils/downloadFromUrl.js";

const downloadGet = async (req, res) => {
  try {
    const fileUrl =
      "https://res.cloudinary.com/doeby7xuf/image/upload/v1741608537/file-uploader/dmvwi3zbslyapydxzrra.png";
    const fileName = "download.png";
    const fileBuffer = await downloadFromURL(fileUrl);

    // Set response headers
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.setHeader("Content-Type", "application/octet-stream");

    // Send file buffer as response
    res.send(fileBuffer);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).send("Failed to download file");
  }
};

export default downloadGet;
