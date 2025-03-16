import fs from "fs";
import https from "https";

const downloadFromURL = async (fileUrl) => {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(outputPath);

    https
      .get(fileUrl, (fileRes) => {
        if (fileRes.statusCode !== 200) {
          return reject(
            new Error(`Failed to fetch file: ${fileRes.statusCode}`)
          );
        }

        fileRes.pipe(fileStream);

        fileStream.on("finish", () => resolve("Download complete"));
        fileStream.on("error", reject);
      })
      .on("error", reject);
  });
};

export default downloadFromURL;
