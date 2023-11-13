const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const cloudinaryConfig = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET,
};
cloudinary.config(cloudinaryConfig);
module.exports = cloudinaryConfig;
