import dotenv from "dotenv";

dotenv.config();

const cloudinaryConfig = {
  cloud_name: "doeby7xuf",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: false,
};

export default cloudinaryConfig;
