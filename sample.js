import { v2 as cloudinary } from "cloudinary";
import cloudinaryConfig from "./config/cloudinaryConfig.js";

cloudinary.config(cloudinaryConfig);

cloudinary.api
  .resource("file-uploader/dmvwi3zbslyapydxzrra")
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
