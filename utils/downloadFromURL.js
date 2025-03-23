import https from "https";

const downloadFromURL = async (fileUrl) => {
  return new Promise((resolve, reject) => {
    https
      .get(fileUrl, (fileRes) => {
        if (fileRes.statusCode !== 200) {
          return reject(
            new Error(`Failed to fetch file: ${fileRes.statusCode}`)
          );
        }

        // Instead of writing to a file, collect data in memory as Buffer chunks
        const chunks = [];

        fileRes.on("data", (chunk) => {
          chunks.push(chunk);
        });

        fileRes.on("end", () => {
          // Combine all chunks into a single Buffer
          const fileBuffer = Buffer.concat(chunks);
          resolve(fileBuffer);
        });
      })
      .on("error", reject);
  });
};

export default downloadFromURL;
